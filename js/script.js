document.getElementById('save-button').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const birthday = document.getElementById('birthday').value;
    const location = document.getElementById('location').value;
    const preferences = Array.from(
      document.querySelectorAll('input[name="preferences"]:checked')
    ).map((checkbox) => checkbox.value);
    const others = document.getElementById('others').value;
    const likes = document.getElementById('likes').value;
  
    const profileData = {
      name,
      age,
      birthday,
      location,
      preferences: [...preferences, others].filter((p) => p),
      likes,
    };
  
    console.log('Saved Profile:', profileData);
    alert('Profile Saved! Check the console for details.');
  });

// 获取背景和头像上传元素
const backgroundInput = document.getElementById("background-upload");
const avatarInput = document.getElementById("avatar-upload");

// 获取背景和头像图片元素
const backgroundImg = document.querySelector(".bkgd");
const avatarImg = document.querySelector(".avatar");

// 更新背景图片
backgroundInput.addEventListener("change", function () {
  const file = this.files[0]; // 获取选中的文件
  if (file) {
    const reader = new FileReader(); // 创建文件读取器
    reader.onload = function (e) {
      backgroundImg.src = e.target.result; // 更新背景图片的 src
    };
    reader.readAsDataURL(file); // 读取文件内容为 Data URL
  }
});

// 更新头像图片
avatarInput.addEventListener("change", function () {
  const file = this.files[0]; // 获取选中的文件
  if (file) {
    const reader = new FileReader(); // 创建文件读取器
    reader.onload = function (e) {
      avatarImg.src = e.target.result; // 更新头像图片的 src
    };
    reader.readAsDataURL(file); // 读取文件内容为 Data URL
  }
});


// Update player count on slider change
// document.addEventListener("DOMContentLoaded", function () {
//   const playerSlider = document.getElementById("players");
//   const playerCount = document.getElementById("player-count");

//   // 初始化显示值
//   playerCount.textContent = playerSlider.value;

//   // 添加滑块监听事件
//   playerSlider.addEventListener("input", function () {
//     playerCount.textContent = playerSlider.value;
//   });
// });


// Update difficulty level on slider change
// const difficultySlider = document.getElementById("difficulty");
// const difficultyLevel = document.getElementById("difficulty-level");

// difficultySlider.addEventListener("input", function () {
//   difficultyLevel.textContent = difficultySlider.value;
// });

// 游戏库相关功能
const API_BASE_URL = 'http://localhost:6790/library';

// 从API获取所有游戏
async function fetchGames() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const games = await response.json();
    return games;
  } catch (error) {
    console.error('获取游戏数据失败:', error);
    return [];
  }
}

// 生成星级评分显示
function generateStars(rating) {
  return '⭐'.repeat(rating);
}

// 创建游戏卡片HTML
function createGameCard(game) {
  return `
    <div class="game-card" data-game-id="${game.id}">
      <img src="${game.imageUrl}" alt="${game.name}" class="game-image" />
      <div class="game-info">
        <h3>${game.name}</h3>
        <p>Players: ${game.players}</p>
        <p>Rate: ${generateStars(game.rating)}</p>
        <p>Difficulty: ${game.difficulty}</p>
        <div class="tags">
          ${game.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
        <div class="game-actions">
          <button onclick="editGame('${game.id}')" class="edit-btn">编辑</button>
          <button onclick="deleteGame('${game.id}')" class="delete-btn">删除</button>
        </div>
      </div>
    </div>
  `;
}

// 渲染游戏列表
async function renderGames() {
  const gameList = document.getElementById('game-list');
  if (!gameList) return;

  const games = await fetchGames();
  gameList.innerHTML = games.map(game => createGameCard(game)).join('');
}

// 添加新游戏
async function addGame(gameData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('游戏添加成功:', result);
    await renderGames(); // 重新渲染游戏列表
    return result;
  } catch (error) {
    console.error('添加游戏失败:', error);
    alert('添加游戏失败: ' + error.message);
  }
}

// 编辑游戏
async function editGame(gameId) {
  const newName = prompt('请输入新的游戏名称:');
  const newRating = prompt('请输入新的评分 (1-5):');
  const newDifficulty = prompt('请输入新的难度 (1-5):');
  
  if (newName && newRating && newDifficulty) {
    try {
      const response = await fetch(`${API_BASE_URL}/${gameId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName,
          rating: parseInt(newRating),
          difficulty: parseInt(newDifficulty)
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('游戏更新成功');
      await renderGames(); // 重新渲染游戏列表
    } catch (error) {
      console.error('更新游戏失败:', error);
      alert('更新游戏失败: ' + error.message);
    }
  }
}

// 删除游戏
async function deleteGame(gameId) {
  if (confirm('确定要删除这个游戏吗？')) {
    try {
      const response = await fetch(`${API_BASE_URL}/${gameId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('游戏删除成功');
      await renderGames(); // 重新渲染游戏列表
    } catch (error) {
      console.error('删除游戏失败:', error);
      alert('删除游戏失败: ' + error.message);
    }
  }
}

// 搜索和过滤功能
function setupSearchAndFilter() {
  const searchInput = document.querySelector('input[aria-label="Search for games"]');
  const playerSlider = document.getElementById('players');
  const difficultySlider = document.getElementById('difficulty');
  const checkboxes = document.querySelectorAll('input[name="type"]');
  
  if (searchInput) {
    searchInput.addEventListener('input', filterGames);
  }
  
  if (playerSlider) {
    playerSlider.addEventListener('input', filterGames);
  }
  
  if (difficultySlider) {
    difficultySlider.addEventListener('input', filterGames);
  }
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterGames);
  });
}

// 过滤游戏
async function filterGames() {
  const allGames = await fetchGames();
  const searchTerm = document.querySelector('input[aria-label="Search for games"]')?.value.toLowerCase() || '';
  const playerCount = parseInt(document.getElementById('players')?.value) || 0;
  const difficulty = parseInt(document.getElementById('difficulty')?.value) || 0;
  const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
  
  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm);
    const matchesPlayers = playerCount === 0 || game.players.includes(playerCount.toString());
    const matchesDifficulty = difficulty === 0 || game.difficulty === difficulty;
    const matchesTypes = selectedTypes.length === 0 || selectedTypes.some(type => game.tags.includes(type));
    
    return matchesSearch && matchesPlayers && matchesDifficulty && matchesTypes;
  });
  
  const gameList = document.getElementById('game-list');
  if (gameList) {
    gameList.innerHTML = filteredGames.map(game => createGameCard(game)).join('');
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  renderGames();
  setupSearchAndFilter();
});

