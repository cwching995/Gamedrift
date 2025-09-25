// /services/gameService.js

import { db } from '../db/db.js';
import { Game } from '../models/games.js';

const getAll = async () => {
  const gameDocs = await db.getAllInCollection(db.GAMES);
  return gameDocs.map(gDoc => Game.fromGameDocument(gDoc));
}

const add = async (gameInfo) => {
  const {insertedId} = await db.addToCollection(db.GAMES, gameInfo);
  return {
    id: insertedId.toString(),
    ...gameInfo
  }
}

const getById = async (id) => {
  const gameDoc = await db.getByIdFromCollection(db.GAMES, id);
  if (!gameDoc) { return null; }
  return Game.fromGameDocument(gameDoc);
}

const updateById = async (id, updateInfo) => {
  const { matchedCount, modifiedCount } = await db.updateByIdInCollection(db.GAMES, id, updateInfo);
  return { matchedCount, modifiedCount };
}

const deleteById = async (id) => {
  const { deletedCount } = await db.deleteByIdInCollection(db.GAMES, id);
  return { deletedCount };
}

export const gameService = {
  getAll, 
  add,
  getById,
  updateById,
  deleteById
}
