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

