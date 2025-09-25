// /routes/libraryRouter.js

import express from 'express';
import { gameControllers } from '../controllers/gameControllers.js';

const libraryRouter = express.Router();

// GET /library - 获取所有游戏
libraryRouter.get('/', gameControllers.getGames);

// POST /library - 添加新游戏
libraryRouter.post('/', gameControllers.addGame);

// GET /library/:id - 根据ID获取游戏
libraryRouter.get('/:id', gameControllers.getGameById);

// PATCH /library/:id - 更新游戏
libraryRouter.patch('/:id', gameControllers.updateGameById);

// DELETE /library/:id - 删除游戏
libraryRouter.delete('/:id', gameControllers.deleteGameById);

export { libraryRouter };
