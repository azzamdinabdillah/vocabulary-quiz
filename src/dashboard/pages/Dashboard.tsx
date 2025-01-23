import DataTable from "react-data-table-component";
import Button from "../../main/components/Button";
import { useEffect, useState } from "react";
import { VocabularyIF } from "../../main/interfaces/Vocabulary";
import db from "../../appwrite/databases";
import { CustomPagination } from "../components/Pagination";
import AddVocabularyForm from "../components/AddVocabularyForm";

export default function Dashboard() {
  const [vocabularies, setVocabularies] = useState<VocabularyIF[]>([]);
  const [inputs, setInputs] = useState<VocabularyIF>({
    english: "",
    indonesian: "",
  });

  async function fetchData() {
    try {
      const result = await db.lists.readAll();
      setVocabularies(result.documents);
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
      width: "50px",
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
    {
      name: "action",
      cell: (row: any) => (
        <div className="flex gap-2">
          <Button
            colorVariant="blue"
            sizeVariant="xs"
            onClick={() => console.log(row.$id)}
          >
            Edit
          </Button>
          <Button colorVariant="pink" sizeVariant="xs">
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="dashboard-page w-full px-5 py-5">
        <div className="w-full flex flex-col gap-3 md:max-w-[665px] mx-auto">
          <h1 className="title">Dashboard</h1>

          <AddVocabularyForm inputs={inputs} setInputs={setInputs} fetchData={fetchData}/>

          <div className="bg-white p-4 rounded-md">
            <div className="table-wrapper">
              <DataTable
                columns={columns}
                data={vocabularies}
                pagination
                paginationComponent={CustomPagination} // Menggunakan pagination kustom
                paginationPerPage={5}
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
