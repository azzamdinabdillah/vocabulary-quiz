import { useContext, useEffect, useState } from "react";
import Button, { ColorVariants } from "../components/Button";
import { Fragment } from "react";
import {
  DrawerSettingsContext,
  DrawerStatsContext,
} from "../context/DrawerContext";
// @ts-ignore
import db from "../../appwrite/databases";
import Countdown from "react-countdown";
import { QuizIF, VocabularyIF } from "../interfaces/Vocabulary";
import Loading from "../../common-components/Loading";
import { Query } from "appwrite";
import { AnswerStatsIF } from "../interfaces/AnsweredStats";
import Modal from "../../common-components/Modal";
import StatsQuiz from "../components/StatsQuiz";

function QuizForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [countdownTime] = useState<number>(Date.now() + 5 * 60 * 1000);
  const drawerSettingsContext = useContext(DrawerSettingsContext);
  const drawerStatsContext = useContext(DrawerStatsContext);
  const [audioCorrect, setAudioCorrect] = useState<HTMLAudioElement | null>(
    null
  );
  const [audioWrong, setAudioWrong] = useState<HTMLAudioElement | null>(null);
  const [modalStats, setModalStats] = useState<boolean>(false);

  useEffect(() => {
    setAudioCorrect(new Audio("/sounds/correct-answer.wav"));
    setAudioWrong(new Audio("/sounds/wrong-answer.mp3"));
  }, []);

  function getPoints(): number {
    const totalQuestions = drawerStatsContext?.quizes.length ?? 0;
    const rightAnswer =
      drawerStatsContext?.answerStats.filter(
        (stat) => stat.isCorrect === true
      ) ?? [];
    const maksimumValue = 100;

    const correctPercentage = (rightAnswer.length / totalQuestions) * 100;
    return Math.round((correctPercentage * maksimumValue) / 100);
  }

  function randomIndex() {
    return Math.floor(Math.random() * drawerStatsContext?.quizes.length!);
  }

  function setAnswerStatsToInitial(datas: any) {
    drawerStatsContext?.setAnswerStats(
      datas.documents.map((quiz: any): AnswerStatsIF => {
        return {
          id: quiz.$id,
          isSelected: "kursi",
          isAnswered: false,
          isCorrect: false,
          answer: quiz.indonesian,
          optionSelectedIndex: -1,
        };
      })
    );
  }

  function handleOptionClick(
    answer: string,
    answerKey: string,
    idQuestion: string,
    idOption: number
  ): void {
    // if (
    //   drawerStatsContext?.activeQuestion ===
    //   drawerStatsContext?.quizes.length! - 1
    // )
    //   return;

    drawerStatsContext?.setActiveQuestion((prevState) => prevState + 1);
    const answerSplit = answer.split(" ");

    drawerStatsContext?.setQuizes((prevState) => {
      return prevState.map((item) =>
        item.$id === idQuestion ? { ...item, isComplete: true } : item
      );
    });

    drawerStatsContext?.setAnswerStats((prevState): AnswerStatsIF[] => {
      return prevState.map((answer) =>
        answer.id === idQuestion
          ? {
              ...answer,
              optionSelectedIndex: idOption,
              isAnswered: true,
              isSelected: answerSplit[1],
              isCorrect: answerKey === answerSplit[1] ? true : false,
            }
          : answer
      );
    });

    if (drawerSettingsContext?.onSound && audioCorrect && audioWrong) {
      audioCorrect.currentTime = 0;
      audioWrong.currentTime = 0;

      if (answerSplit[1] === answerKey) {
        audioCorrect.play();
      } else {
        audioWrong.play();
      }
    }
  }

  async function fetchData(): Promise<VocabularyIF[] | void> {
    try {
      setLoading(true);
      const result = await db.lists.readAll([Query.limit(100)]);

      const quizesWithSuffledOptions = result.documents.map(
        (quiz: any): QuizIF => {
          const correctAnswer = quiz.indonesian;
          const wrongAnswer = result.documents
            .filter((q: any) => q.indonesian !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((q: any) => q.indonesian);

          const shuffeldOptions = [...wrongAnswer, correctAnswer].sort(
            () => Math.random() - 0.5
          );

          return {
            ...quiz,
            options: shuffeldOptions,
            isCompleted: false,
          };
        }
      );

      drawerStatsContext?.setQuizes(quizesWithSuffledOptions);

      setAnswerStatsToInitial(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (drawerStatsContext?.quizes.length! > 0) {
      randomIndex();
    }
  }, [drawerStatsContext?.quizes]);

  return (
    <div className="gap-4 flex flex-col">
      {modalStats ? (
        <Modal setModalStats={setModalStats}>
          <StatsQuiz />

          <Button
            sizeVariant="regular"
            colorVariant="green"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Ulangi Dari Awal
          </Button>
        </Modal>
      ) : (
        ""
      )}
      <div className="flex justify-between items-center border-bottom-black py-[10px]">
        <div className="flex items-center">
          <img src="/icons/interrogation.svg" alt="" />
          <p className="text-primary-black font-bold text-base">
            {/* {(drawerStatsContext?.answerStats.answered ?? 0) + 1}/ */}
            {(drawerStatsContext?.activeQuestion ?? 0) + 1}/
            {drawerStatsContext?.quizes.length}
          </p>
        </div>
        <p className="text-primary-black font-bold text-base">
          {getPoints()}/ 100 Points
        </p>
        <div className="flex items-center">
          <p className="text-primary-black font-bold text-base">
            <Countdown
              date={countdownTime}
              renderer={({ minutes, seconds, completed }) => {
                const formatTime = (time: number): number | string =>
                  time < 10 ? `0${time}` : time;

                return (
                  <>
                    {!completed ? (
                      <span>
                        {formatTime(minutes)}:{formatTime(seconds)}
                      </span>
                    ) : (
                      <span>Selesai</span>
                    )}
                  </>
                );
              }}
            />
          </p>
          <img src="/icons/clock.svg" alt="" />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="w-full mx-auto flex justify-center mt-5">
            <Loading size="lg" />
          </div>
        ) : (
          drawerStatsContext?.quizes.map((quiz, index) => {
            if (drawerStatsContext?.activeQuestion !== index) return null;

            return (
              <Fragment key={index}>
                <h2 className="text-primary-black font-extrabold text-2xl capitalize">
                  {index + 1}. Apa Bahasa Indonesia Dari {quiz.english}
                </h2>

                <div className="gap-3 flex flex-col">
                  {quiz.options.map((opt, idx) => (
                    <Button
                      className={`${
                        drawerStatsContext.answerStats[index]
                          .optionSelectedIndex === idx
                          ? "after:bg-option-check after:bg-contain after:bg-center after:contents-[''] after:w-5 after:h-5 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-5 relative"
                          : ""
                      } flex-grow max-w-full`}
                      key={idx}
                      onClick={(e) =>
                        handleOptionClick(
                          e.currentTarget.textContent!,
                          quiz.indonesian,
                          quiz.$id!,
                          idx
                        )
                      }
                      colorVariant={
                        ["pink", "green", "yellow", "blue"][
                          idx % quiz.options.length
                        ] as ColorVariants
                      }
                    >
                      {String.fromCharCode(65 + idx)}) {opt}
                    </Button>
                  ))}
                </div>
              </Fragment>
            );
          })
        )}
      </div>

      {(drawerStatsContext?.activeQuestion ?? 0) ===
      (drawerStatsContext?.quizes.length ?? 0) ? (
        <Button
          colorVariant="pink"
          sizeVariant="regular"
          className=""
          onClick={() => {
            confirm("Yakin Selesai?") ? setModalStats(true) : "";
          }}
        >
          Klik Jika Sudah Selesai
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default QuizForm;
