import Button from "../../main/components/Button";
import InputText from "./Inputs";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { VocabularyIF } from "../../main/interfaces/Vocabulary";
import Loading from "../../common-components/Loading";
import { ToastState } from "../../interfaces/Toast";
import db from "../../appwrite/databases";

interface AddVocabularyFormIF {
  inputs: VocabularyIF;
  setInputs: Dispatch<SetStateAction<VocabularyIF>>;
  fetchData: () => void;
  setShowToast: Dispatch<SetStateAction<ToastState>>;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function AddVocabularyForm({
  inputs,
  setInputs,
  fetchData,
  setShowToast,
  isEdit,
  setIsEdit,
}: AddVocabularyFormIF) {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    buttonCreate: false,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading({ buttonCreate: true });
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
      setLoading({ buttonCreate: false });
    }
  }

  async function updateData(datas: VocabularyIF) {
    try {
      setLoading({ buttonUpdate: true });
      const response = await db.lists.update(datas.id, {
        english: datas.english,
        indonesian: datas.indonesian,
      });

      if (response) {
        fetchData();
        setShowToast({
          isShow: true,
          toastColor: "success",
          message: "Vocabulary Successfuly Updated",
        });
      }
    } catch (error) {
      console.log(error);

      setShowToast({
        isShow: true,
        toastColor: "error",
        message: "Vocabulary Failed Updated, Error: " + error,
      });
    } finally {
      setInputs({
        english: "",
        indonesian: "",
        id: "",
      });
      setLoading({ buttonUpdate: false });
      setIsEdit(false);
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
          {isEdit ? (
            <div className="flex gap-3 items-center">
              <Button
                colorVariant="yellow"
                sizeVariant="regular"
                type="button"
                onClick={() => {
                  setInputs({
                    english: "",
                    indonesian: "",
                    id: "",
                  });
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorVariant="blue"
                sizeVariant="regular"
                type="button"
                onClick={() => updateData(inputs)}
              >
                {loading.buttonUpdate ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading size="sm" />
                    Please Wait...
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              colorVariant="blue"
              sizeVariant="regular"
              disabled={loading.buttonCreate}
            >
              {loading.buttonCreate ? (
                <div className="flex items-center justify-center gap-2">
                  <Loading size="sm" />
                  Please Wait...
                </div>
              ) : (
                "Add To My Vocabluary List"
              )}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
