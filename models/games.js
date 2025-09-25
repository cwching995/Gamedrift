// in /models/games.js

class Game {
    id = '';
    name = '';
    players = '';
    rating = 0;
    difficulty = 1;
    tags = [];
    imageUrl = '';
    description = '';
  
    constructor(gameFields) {
      const id = gameFields.id ?? String(Date.now());
      this.updateProperties({id, ...gameFields});
    }
  
    updateProperties = (gameFields) => {
      this.id = gameFields.id ?? this.id;
      this.name = gameFields.name ?? this.name;
      this.players = gameFields.players ?? this.players;
      this.rating = gameFields.rating ?? this.rating;
      this.difficulty = gameFields.difficulty ?? this.difficulty;
      this.tags = gameFields.tags ?? this.tags;
      this.imageUrl = gameFields.imageUrl ?? this.imageUrl;
      this.description = gameFields.description ?? this.description;
    }
  
    static fromGameDocument = (gameDocument) => {
      const id = gameDocument._id?.toString(); // convert ObjectId() to string
      if (!id) {
        throw new Error('Could not find _id in Game Document');
      }
      delete gameDocument._id;
      const game = new Game({id, ...gameDocument});
      return game;
    }
  }
  
  export { Game };
