// in /db/db.js

import { MongoClient, ObjectId } from "mongodb";

const mongoURI = 'mongodb://127.0.0.1:27017';
const dbName = 'gamedrift';
const GAMES = 'games'; // collection name

let mongoClient = null;
let theDb = null;

const init = async () => {
  mongoClient = new MongoClient(mongoURI);
  await mongoClient.connect();
  theDb = mongoClient.db(dbName);
}

const getAllInCollection = async (collectionName) => {
  if (!mongoClient) { await init(); }
  const allDocs = await theDb.collection(collectionName).find();
  return allDocs.toArray();
}

const getByIdFromCollection = async (collectionName, id) => {
  if (!mongoClient) { await init(); }
  const objectId = new ObjectId(id);
  const doc = await theDb.collection(collectionName).findOne({ _id: objectId });
  return doc;
}

const addToCollection = async (collectionName, docData) => {
  if (!mongoClient) { await init(); }
  const result = await theDb.collection(collectionName).insertOne(docData);
  return result;
}

const updateByIdInCollection = async (collectionName, id, updateDoc) => {
  if (!mongoClient) { await init(); }
  const objectId = new ObjectId(id);
  const result = await theDb.collection(collectionName).updateOne(
    { _id: objectId },
    { $set: updateDoc }
  );
  return result;
}

const deleteByIdInCollection = async (collectionName, id) => {
  if (!mongoClient) { await init(); }
  const objectId = new ObjectId(id);
  const result = await theDb.collection(collectionName).deleteOne({ _id: objectId });
  return result;
}

export const db = {
  init, 
  getAllInCollection, 
  getByIdFromCollection,
  updateByIdInCollection,
  deleteByIdInCollection,
  addToCollection,
  GAMES
}
