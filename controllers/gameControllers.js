// /controllers/gameControllers.js

import { gameService } from '../services/gameService.js';

const getGames = async (req, res) => {
  try {
    const allGames = await gameService.getAll();
    res.json(allGames);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
}

const addGame = async (req, res) => {
  try {
    const postData = req.body;
    const { id } = await gameService.add(postData);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add game' });
  }
}

const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await gameService.getById(id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    next(err);
  }
}

const updateGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateInfo = req.body;
    const result = await gameService.updateById(id, updateInfo);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json({ updated: result.modifiedCount > 0 });
  } catch (err) {
    next(err);
  }
}

const deleteGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await gameService.deleteById(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
}

export const gameControllers = {
  getGames,
  addGame,
  getGameById,
  updateGameById,
  deleteGameById
}
