import { useEffect, useState } from "react";
import Button, { ColorVariants } from "../components/Button";

function QuizForm() {
  interface IQuiz {
    english: string;
    indonesian: string;
  }

  const [quizes, setQuizes] = useState<IQuiz[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);

  function randomIndex() {
    return Math.floor(Math.random() * quizes.length);
  }

  function handleOptionClick(answer: string, answerKey: string): void {
    setActiveQuestion((prevState) => prevState + 1);
    const answerSplit = answer.split(" ");

    if (answerKey === answerSplit[1]) {
      console.log("benar");
    } else {
      console.log("salah");
    }
  }

  async function fetchData(): Promise<IQuiz[] | void> {
    const response = await fetch("/datas/quiz.json", {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setQuizes(result);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (quizes.length > 0) {
      randomIndex();
    }
  }, [quizes]);

  return (
    <div className="gap-4 flex flex-col">
      <div className="flex justify-between items-center border-bottom-black py-[10px]">
        <div className="flex items-center">
          <img src="/icons/interrogation.svg" alt="" />
          <p className="text-primary-black font-bold text-base">05/08</p>
        </div>
        <p className="text-primary-black font-bold text-base">150 Points</p>
        <div className="flex items-center">
          <p className="text-primary-black font-bold text-base">04:23</p>
          <img src="/icons/clock.svg" alt="" />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {quizes.map((quiz, index) => {
          if (activeQuestion !== index) return null;

          const correctAnswer = quiz.indonesian;
          const wrongAnswer = quizes
            .filter((q) => q.indonesian !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

          const options = [
            correctAnswer,
            ...wrongAnswer.map((q) => q.indonesian),
          ].sort(() => Math.random() - 0.5);

          return (
            <>
              <h2 className="text-primary-black font-extrabold text-2xl">
                {index + 1}. Apa Bahasa Indonesia Dari {quiz.english}
              </h2>

              <div className="gap-3 flex flex-col">
                {options.map((opt, idx) => (
                  <Button
                    onClick={(e) =>
                      handleOptionClick(
                        e.currentTarget.textContent!,
                        quiz.indonesian
                      )
                    }
                    colorVariant={["pink", "green", "yellow", "blue"][idx % options.length] as ColorVariants}
                  >
                    {String.fromCharCode(65 + idx)}) {opt}
                  </Button>
                ))}
                ;
              </div>
            </>
          );
        })}
        {/* {quizes.map((quiz, index) => (
          <>
            {activeQuestion === index ? (
              <>
                <h2 className="text-primary-black font-extrabold text-2xl">
                  {index + 1}. Apa Bahasa Indonesia Dari {quiz.english}
                </h2>
                <div className="gap-3 flex flex-col">
                  <Button
                    onClick={(e) =>
                      handleOptionClick(
                        e.currentTarget.textContent!,
                        quiz.indonesian
                      )
                    }
                    colorVariant="pink"
                  >
                    A) {quiz.indonesian}
                  </Button>
                  <Button
                    onClick={(e) =>
                      handleOptionClick(
                        e.currentTarget.textContent!,
                        quiz.indonesian
                      )
                    }
                    colorVariant="green"
                  >
                    B) {quizes[randomIndex()].english}
                  </Button>
                  <Button
                    onClick={(e) =>
                      handleOptionClick(
                        e.currentTarget.textContent!,
                        quiz.indonesian
                      )
                    }
                    colorVariant="yellow"
                  >
                    C) {quizes[randomIndex()].english}
                  </Button>
                  <Button
                    onClick={(e) =>
                      handleOptionClick(
                        e.currentTarget.textContent!,
                        quiz.indonesian
                      )
                    }
                    colorVariant="blue"
                  >
                    D) {quizes[randomIndex()].english}
                  </Button>
                </div>
              </>
            ) : (
              ""
            )}

            <Button colorVariant="green">B) Andrew Jacks</Button>
            <Button colorVariant="yellow">C) Thomas Jefferson</Button>
            <Button colorVariant="blue">D) Grover Cleveland</Button>
          </>
        ))} */}
      </div>
    </div>
  );
}

export default QuizForm;
