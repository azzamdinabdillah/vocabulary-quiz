import { ID, Models, Query } from "appwrite";
import { databases } from "./config";

interface CollectionsIF {
  dbId: string;
  id: string;
  name: string;
}

type DatabaseType<T extends Models.Document = any> = {
  readAll: (queries?: Query[]) => Promise<Models.DocumentList<T>>;
  create: (data: T, id?: string) => Promise<Models.Document>;
  delete: (id: string) => void;
  readSingle: (id: string, queries?: Query[]) => Promise<Models.Document>;
};

const collections: CollectionsIF[] = [
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_LISTS_ID,
    name: "lists",
  },
];

// type CollectionName = (typeof collections)[number]["name"];

const db: Record<string, DatabaseType> = {};

collections.forEach((collection) => {
  db[collection.name] = {
    readAll: (queries = []) => {
      return databases.listDocuments(collection.dbId, collection.id, queries);
    },
    create: (datas, id = ID.unique()) => {
      return databases.createDocument(
        collection.dbId,
        collection.id,
        id,
        datas
      );
    },
    delete: (id) =>
      databases.deleteDocument(collection.dbId, collection.id, id),
    readSingle: (id, queries = []) =>
      databases.getDocument(collection.dbId, collection.id, id, queries),
  };
});

export default db;
