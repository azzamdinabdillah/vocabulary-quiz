import { ID } from "appwrite";
import { databases } from "./config";

const db = {};

const collections = [
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_LISTS_ID,
    name: "lists",
  },
];

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
    update: (id, datas) =>
      databases.updateDocument(collection.dbId, collection.id, id, datas),
  };
});

export default db;
