import { useContext, useEffect, useState } from "react";
import Button, { ColorVariants } from "../components/Button";
import { Fragment } from "react";
import {
  DrawerSettingsContext,
  DrawerStatsContext,
} from "../context/DrawerContext";
import db from "../../appwrite/databases";
import Countdown from "react-countdown";
import { VocabularyIF } from "../interfaces/Vocabulary";
import Loading from "../../common-components/Loading";
import { Query } from "appwrite";

function QuizForm() {
  const [loading, setLoading] = useState<boolean>(false);
  // const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [countdownTime, setCoundownTime] = useState<number>(
    Date.now() + 5 * 60 * 1000
  );
  const drawerSettingsContext = useContext(DrawerSettingsContext);
  const drawerStatsContext = useContext(DrawerStatsContext);

  function randomIndex() {
    return Math.floor(Math.random() * drawerStatsContext?.quizes.length!);
  }

  function handleOptionClick(answer: string, answerKey: string): void {
    drawerStatsContext?.setActiveQuestion((prevState) => prevState + 1);
    const answerSplit = answer.split(" ");
    const audio = new Audio("/sounds/option-hit.mp3");

    if (answerKey === answerSplit[1]) {
      drawerStatsContext?.setAnswerStats((prevState) => {
        return {
          answered: prevState.answered + 1,
          rightAnswered: prevState.rightAnswered + 1,
          wrongAnswered: prevState.wrongAnswered,
        };
      });
    } else {
      drawerStatsContext?.setAnswerStats((prevState) => {
        return {
          answered: prevState.answered + 1,
          rightAnswered: prevState.rightAnswered,
          wrongAnswered: prevState.wrongAnswered + 1,
        };
      });
    }

    if (drawerStatsContext?.activeQuestion === drawerStatsContext?.quizes.length! - 1) {
      drawerStatsContext?.setActiveQuestion(0);
      drawerStatsContext?.setAnswerStats({
        answered: 0,
        rightAnswered: 0,
        wrongAnswered: 0,
      });
    }

    if (drawerSettingsContext?.onSound) {
      audio.play();
    }
  }

  async function fetchData(): Promise<VocabularyIF[] | void> {
    try {
      setLoading(true);
      const result = await db.lists.readAll([Query.limit(100)]);
      drawerStatsContext?.setQuizes(result.documents);
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
      <div className="flex justify-between items-center border-bottom-black py-[10px]">
        <div className="flex items-center">
          <img src="/icons/interrogation.svg" alt="" />
          <p className="text-primary-black font-bold text-base">
            {(drawerStatsContext?.answerStats.answered ?? 0) + 1}/
            {drawerStatsContext?.quizes.length}
          </p>
        </div>
        <p className="text-primary-black font-bold text-base">150 Points</p>
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

            const correctAnswer = quiz.indonesian;
            const wrongAnswer = drawerStatsContext?.quizes
              .filter((q) => q.indonesian !== correctAnswer)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);

            const options = [
              correctAnswer,
              ...wrongAnswer.map((q) => q.indonesian),
            ].sort(() => Math.random() - 0.5);

            return (
              <Fragment key={index}>
                <h2 className="text-primary-black font-extrabold text-2xl capitalize">
                  {index + 1}. Apa Bahasa Indonesia Dari {quiz.english}
                </h2>

                <div className="gap-3 flex flex-col">
                  {options.map((opt, idx) => (
                    <Button
                      key={idx}
                      onClick={(e) =>
                        handleOptionClick(
                          e.currentTarget.textContent!,
                          quiz.indonesian
                        )
                      }
                      colorVariant={
                        ["pink", "green", "yellow", "blue"][
                          idx % options.length
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
    </div>
  );
}

export default QuizForm;
