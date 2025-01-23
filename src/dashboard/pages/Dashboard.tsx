import DataTable from "react-data-table-component";
import Button from "../../main/components/Button";
import InputText from "../components/Inputs";
import { useEffect, useState } from "react";
import { VocabularyIF } from "../../main/interfaces/Vocabulary";
import db from "../../appwrite/databases";
import { CustomPagination } from "../components/Pagination";

export default function Dashboard() {
  const [vocabularies, setVocabularies] = useState<VocabularyIF[]>([]);

  async function fetchData() {
    try {
      const result = await db.lists.readAll();
      setVocabularies(result.documents);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Definisi kolom tabel
  const columns = [
    {
      name: "No",
      selector: (_row: any, index: number) => index + 1,
      sortable: true,
    },
    { name: "English", selector: (row: any) => row.english, sortable: true },
    {
      name: "Indonesian",
      selector: (row: any) => row.indonesian,
      sortable: true,
    },
    {
      name: "id",
      selector: (row: any) => row.$id,
      omit: true,
    },
  ];

  return (
    <>
      <div className="dashboard-page w-full px-5 py-5 flex flex-col gap-3">
        <h1 className="title">Dashboard</h1>

        <div className="bg-white p-4 rounded-md flex flex-col gap-3">
          <div>
            <label htmlFor="" className="label-custom">
              English
            </label>
            <InputText placeholder="Insert Your English Vocabulary Here.." />
          </div>

          <div>
            <label htmlFor="" className="label-custom">
              Indonesian
            </label>
            <InputText placeholder="Insert Your Indonesian Vocabulary Here.." />
          </div>

          <div className="mt-1">
            <Button colorVariant="blue" sizeVariant="regular">
              Add To My Vocabluary List
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md">
          <DataTable
            columns={columns}
            data={vocabularies}
            pagination
            paginationComponent={CustomPagination} // Menggunakan pagination kustom
            paginationPerPage={2}
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
}
