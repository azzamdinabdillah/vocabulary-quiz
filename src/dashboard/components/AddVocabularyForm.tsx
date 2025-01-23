import Button from "../../main/components/Button";
import InputText from "./Inputs";
import db from "../../appwrite/databases";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { VocabularyIF } from "../../main/interfaces/Vocabulary";

export default function AddVocabularyForm({
  inputs,
  setInputs,
  fetchData,
}: {
  inputs: VocabularyIF;
  setInputs: Dispatch<SetStateAction<VocabularyIF>>;
  fetchData: () => void;
}) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await db.lists.create(inputs);
      if (response) fetchData();
      setInputs({
        english: "",
        indonesian: "",
      });
    } catch (error) {
      console.log(error);
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
          <Button colorVariant="blue" sizeVariant="regular">
            Add To My Vocabluary List
          </Button>
        </div>
      </form>
    </>
  );
}
