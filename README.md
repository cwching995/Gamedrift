# GameDrift

A modern board game library web application with a full-stack architecture featuring a React-like frontend and a robust Node.js/Express backend with MongoDB integration.

## Features

- **Interactive Game Library**: Browse and explore board games with detailed information
- **Advanced Filtering**: Search games by name, player count, difficulty, and game type
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **RESTful API**: Complete CRUD operations for game management
- **Real-time Updates**: Dynamic content loading from the backend

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - Interactive functionality and API integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **MongoDB Driver** - Database connectivity

## Project Structure

```
Gamedrift/
├── css/
│   ├── html5reset.css
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── cat.png
│   ├── exp.png
│   ├── fufu.jpg
│   ├── game.png
│   ├── uno.png
│   ├── water.jpg
│   └── wolf.png
├── db/
│   └── db.js
├── models/
│   └── games.js
├── services/
│   └── gameService.js
├── controllers/
│   └── gameControllers.js
├── routes/
│   └── libraryRouter.js
├── middleware/
│   └── errorHandler.js
├── home.html
├── library.html
├── profile.html
├── server.js
├── sample-games.json
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Gamedrift
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your local machine (default port 27017)


5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:6790
   - API Base URL: http://localhost:6790/library

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/library` | Get all games |
| POST | `/library` | Add a new game |
| GET | `/library/:id` | Get game by ID |
| PATCH | `/library/:id` | Update game by ID |
| DELETE | `/library/:id` | Delete game by ID |

### Game Object Structure

```json
{
  "id": "unique_identifier",
  "name": "Game Name",
  "players": "2-4",
  "rating": 4,
  "difficulty": 2,
  "tags": ["Strategy", "Card"],
  "imageUrl": "images/game.png",
  "description": "Game description"
}
```

### Example API Usage

**Get all games:**
```bash
curl http://localhost:6790/library
```

**Add a new game:**
```bash
curl -X POST http://localhost:6790/library \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Game",
    "players": "2-6",
    "rating": 5,
    "difficulty": 3,
    "tags": ["Strategy", "Economic"],
    "imageUrl": "images/new-game.png",
    "description": "A great new game!"
  }'
```

## Usage

### Frontend Pages
- **Home** (`/home.html`) - Landing page with project overview
- **Library** (`/library.html`) - Interactive game library with filtering
- **Profile** (`/profile.html`) - User profile management

### Game Library Features
- **Search**: Type in the search box to find games by name
- **Player Filter**: Use the slider to filter by player count
- **Difficulty Filter**: Adjust difficulty level with the slider
- **Type Filter**: Check boxes to filter by game types (Card, Strategy, etc.)

