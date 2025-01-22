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
  };
});

export default db;
