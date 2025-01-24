import Button from "../../main/components/Button";
import InputText from "./Inputs";
import db from "../../appwrite/databases";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { VocabularyIF } from "../../main/interfaces/Vocabulary";
import Loading from "../../common-components/Loading";
import { ToastState } from "../../interfaces/Toast";

export default function AddVocabularyForm({
  inputs,
  setInputs,
  fetchData,
  showToast,
  setShowToast
}: {
  inputs: VocabularyIF;
  setInputs: Dispatch<SetStateAction<VocabularyIF>>;
  fetchData: () => void;
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<ToastState>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast((prev) => ({
        ...prev,
        isShow: false,
      }));
    }, 4000);

    return () => clearTimeout(timeout);
  }, [showToast]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await db.lists.create(inputs);
      if (response) {
        fetchData();

        setShowToast({
          isShow: true,
          toastColor: "success",
          message: "Vocabulary Successfully Added",
        });
      }

      setInputs({
        english: "",
        indonesian: "",
      });
    } catch (error) {
      console.log(error);

      setShowToast({
        isShow: true,
        toastColor: "error",
        message: `Vocabulary Failed Added, Error : ${error}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        className="bg-white p-4 rounded-md flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="" className="label-custom">
            English
          </label>
          <InputText
            value={inputs.english}
            onChange={(e) =>
              setInputs({
                ...inputs,
                english: e.target.value,
              })
            }
            placeholder="Insert Your English Vocabulary Here.."
          />
        </div>

        <div>
          <label htmlFor="" className="label-custom">
            Indonesian
          </label>
          <InputText
            placeholder="Insert Your Indonesian Vocabulary Here.."
            value={inputs.indonesian}
            onChange={(e) =>
              setInputs({
                ...inputs,
                indonesian: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-1">
          <Button colorVariant="blue" sizeVariant="regular" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loading size="sm" />
                Please Wait...
              </div>
            ) : (
              "Add To My Vocabluary List"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
