// const puzzleContainer = document.getElementById("puzzleContainer");
// const startBtn = document.getElementById("startBtn");
// const movesCount = document.getElementById("movesCount");
// const uploadImage = document.getElementById("uploadImage");
// const difficultySelect = document.getElementById("difficulty");

// let gridSize = 4;
// let tileSize = 100;
// let tiles = [];
// let moves = 0;
// let imageURL = '';

// const localImages = [
//   'images/nature1.jpg',
//   'images/nature2.jpg',
//   'images/nature3.jpg',
//   'images/nature4.jpg'
// ];

// function createPuzzle(image) {
//   puzzleContainer.innerHTML = '';
//   tiles = [];
//   moves = 0;
//   movesCount.textContent = 'Moves: 0';

//   gridSize = parseInt(difficultySelect.value);
//   tileSize = 400 / gridSize;

//   puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
//   puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

//   for (let i = 0; i < gridSize * gridSize; i++) {
//     const tile = document.createElement("div");
//     tile.className = "tile";
//     tile.draggable = true;
//     tile.dataset.index = i;
//     tile.style.backgroundImage = `url(${image})`;

//     const row = Math.floor(i / gridSize);
//     const col = i % gridSize;
//     tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
//     tile.style.width = `${tileSize}px`;
//     tile.style.height = `${tileSize}px`;

//     tiles.push(tile);
//   }

//   shuffleAndRender();
//   enableDragAndDrop();
// }

// function shuffleAndRender() {
//   for (let i = tiles.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
//   }
//   updatePuzzle();
// }

// function enableDragAndDrop() {
//   let dragged;
//   tiles.forEach(tile => {
//     tile.addEventListener("dragstart", () => dragged = tile);
//     tile.addEventListener("dragover", e => e.preventDefault());
//     tile.addEventListener("drop", e => {
//       e.preventDefault();
//       if (dragged === e.target) return;

//       const draggedIndex = tiles.indexOf(dragged);
//       const targetIndex = tiles.indexOf(e.target);

//       [tiles[draggedIndex], tiles[targetIndex]] = [tiles[targetIndex], tiles[draggedIndex]];
//       updatePuzzle();

//       moves++;
//       movesCount.textContent = `Moves: ${moves}`;
//       checkIfSolved();
//     });
//   });
// }

// function updatePuzzle() {
//   puzzleContainer.innerHTML = '';
//   tiles.forEach(tile => puzzleContainer.appendChild(tile));
// }

// function checkIfSolved() {
//   const isSolved = tiles.every((tile, index) => parseInt(tile.dataset.index) === index);
//   if (isSolved) {
//     setTimeout(() => alert(`🎉 Puzzle Solved in ${moves} moves!`), 100);
//   }
// }

// // ✅ Fetch image from Pexels API
// async function getRandomImageFromPexels() {
//   const apiKey = "3Oc14JRKBU54mGZlopcd6MWeG6XsCmn7JFCwtDf5Glqv7rvjgMzoEmHI";
//   const response = await fetch(
//     "https://api.pexels.com/v1/search?query=nature&per_page=1&page=" + Math.floor(Math.random() * 80),
//     {
//       headers: {
//         Authorization: apiKey
//       }
//     }
//   );

//   const data = await response.json();
//   if (data.photos && data.photos.length > 0) {
//     return data.photos[0].src.large;
//   } else {
//     throw new Error("No image found in API.");
//   }
// }

// // ✅ Load image with fallback to local images
// async function loadImageWithFallback() {
//   try {
//     const remoteImage = await getRandomImageFromPexels();
//     return remoteImage;
//   } catch (error) {
//     console.warn("Pexels API failed. Falling back to local image.");
//     const fallbackImage = localImages[Math.floor(Math.random() * localImages.length)];
//     return fallbackImage;
//   }
// }

// // ✅ Start puzzle
// startBtn.addEventListener("click", async () => {
//   const selectedImage = await loadImageWithFallback();
//   imageURL = selectedImage;
//   createPuzzle(imageURL);
// });

// // ✅ Upload custom image
// uploadImage.addEventListener("change", e => {
//   const file = e.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (evt) {
//       imageURL = evt.target.result;
//       createPuzzle(imageURL);
//     };
//     reader.readAsDataURL(file);
//   }
// });
const puzzleContainer = document.getElementById("puzzleContainer");
const startBtn = document.getElementById("startBtn");
const movesCount = document.getElementById("movesCount");
const uploadImage = document.getElementById("uploadImage");
const difficultySelect = document.getElementById("difficulty");

let gridSize = 4;
let tileSize = 100;
let tiles = [];
let moves = 0;
let imageURL = '';

const localImages = [
  'images/nature1.jpg',
  'images/nature2.jpg',
  'images/nature3.jpg',
  'images/nature4.jpg'
];

function createPuzzle(image) {
  puzzleContainer.innerHTML = '';
  tiles = [];
  moves = 0;
  movesCount.textContent = 'Moves: 0';

  gridSize = parseInt(difficultySelect.value);
  tileSize = 400 / gridSize;

  puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.dataset.index = i;

    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    tile.style.backgroundImage = `url(${image})`;
    tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
    tile.style.backgroundSize = `400px 400px`;
    tile.style.width = `${tileSize}px`;
    tile.style.height = `${tileSize}px`;

    tiles.push(tile);
  }

  shuffleAndRender();
  enableDragAndDrop();
}

function shuffleAndRender() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  updatePuzzle();
}

function enableDragAndDrop() {
  let dragged;
  tiles.forEach(tile => {
    tile.addEventListener("dragstart", () => dragged = tile);
    tile.addEventListener("dragover", e => e.preventDefault());
    tile.addEventListener("drop", e => {
      e.preventDefault();
      if (dragged === e.target) return;

      const draggedIndex = tiles.indexOf(dragged);
      const targetIndex = tiles.indexOf(e.target);

      [tiles[draggedIndex], tiles[targetIndex]] = [tiles[targetIndex], tiles[draggedIndex]];
      updatePuzzle();

      moves++;
      movesCount.textContent = `Moves: ${moves}`;
      checkIfSolved();
    });
  });
}

function updatePuzzle() {
  puzzleContainer.innerHTML = '';
  tiles.forEach(tile => puzzleContainer.appendChild(tile));
}

function checkIfSolved() {
  const isSolved = tiles.every((tile, index) => parseInt(tile.dataset.index) === index);
  if (isSolved) {
    setTimeout(() => alert(`🎉 Puzzle Solved in ${moves} moves!`), 100);
  }
}

// ✅ Fetch image from Pexels API
async function getRandomImageFromPexels() {
  const apiKey = "3Oc14JRKBU54mGZlopcd6MWeG6XsCmn7JFCwtDf5Glqv7rvjgMzoEmHI";
  const randomPage = Math.floor(Math.random() * 50) + 1;

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=nature&per_page=1&page=${randomPage}`,
    {
      headers: {
        Authorization: apiKey
      }
    }
  );

  if (!response.ok) throw new Error("API failed");
  const data = await response.json();
  if (data.photos.length > 0) {
    return data.photos[0].src.large2x;
  }
  throw new Error("No image found");
}

// ✅ Load image with fallback to local images
async function loadImageWithFallback() {
  try {
    const remoteImage = await getRandomImageFromPexels();
    return remoteImage;
  } catch (error) {
    console.warn("Pexels API failed. Using local fallback.");
    const fallbackImage = localImages[Math.floor(Math.random() * localImages.length)];
    return fallbackImage;
  }
}

// ✅ Start puzzle with API or fallback image
startBtn.addEventListener("click", async () => {
  const selectedImage = await loadImageWithFallback();
  const img = new Image();
  img.onload = () => {
    imageURL = selectedImage;
    createPuzzle(imageURL);
  };
  img.onerror = () => alert("❌ Failed to load image from Pexels or local.");
  img.src = selectedImage;
});

// ✅ Upload custom image
uploadImage.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      const img = new Image();
      img.onload = () => {
        imageURL = evt.target.result;
        createPuzzle(imageURL);
      };
      img.onerror = () => alert("❌ Failed to load uploaded image.");
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});
