const audiosData = [
  {
    title: "Ghalban.mp3",
    artist: "Assala Nasri",
    file: "songs/Ghalban.mp3",
  },
];
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const backward10Btn = document.getElementById("backward-10-btn");
const forward10Btn = document.getElementById("forward-10-btn");
const disc = document.getElementById("disc");
const timeLine = document.getElementById("time-line");
const listOpenBtn = document.getElementById("open-list");
const listCloseBtn = document.getElementById("close-list");
const playList = document.getElementById("play-list");
const addToList = document.getElementById("add-to-list");
const nextAudioBtn = document.getElementById("next-audio");
const previousAudioBtn = document.getElementById("previous-audio-btn");
const audioName = document.getElementById("audio-name");
const artist = document.getElementById("artist-name");
const list = document.querySelector(".play-list ul");
const addContainer = document.getElementById("add-container");
let currentAudio = 0;
disc.style.animationPlayState = "paused";

runAudio();
audio.onloadeddata = function () {
  timeLine.max = audio.duration;
  timeLine.value = audio.currentTime;
  audioName.textContent = audiosData[currentAudio].title;
  artist.textContent = audiosData[currentAudio].artist;
};
function runAudio() {
  if (audio.currentTime > 0) {
    pauseAudio();
  }
  newAudioSrc = audiosData[currentAudio].file;
  audio.src = newAudioSrc;
}
function playAudio() {
  if (audio.paused) {
    audio.play();
    pauseBtn.style.display = "block";
    playBtn.style.display = "none";
    disc.style.animationPlayState = "running";
  }
}
function pauseAudio() {
  if (!audio.paused) {
    audio.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
    disc.style.animationPlayState = "paused";
  }
}

playBtn.addEventListener("click", () => {
  playAudio();
});

pauseBtn.addEventListener("click", () => {
  pauseAudio();
});
backward10Btn.addEventListener("click", () => {
  audio.currentTime -= 10;
});
forward10Btn.addEventListener("click", () => {
  audio.currentTime += 10;
});
nextAudioBtn.addEventListener("click", () => {
  currentAudio++;
  if (currentAudio < audiosData.length) {
    runAudio();
    playAudio();
  } else {
    currentAudio = 0;
    runAudio();
    playAudio();
  }
});
previousAudioBtn.addEventListener("click", () => {
  if (audio.currentTime < 2) {
    currentAudio--;
    if (currentAudio >= 0) {
      runAudio();
      playAudio();
    } else {
      currentAudio = audiosData.length - 1;
      runAudio();
      playAudio();
    }
  } else {
    audio.currentTime = 0;
  }
});
timeLine.addEventListener("change", () => {
  audio.currentTime = timeLine.value;
  playAudio();
});
audio.addEventListener("timeupdate", () => {
  //for stop timeLine change when i change it manually
  if (!timeLine.matches(":active")) {
    timeLine.value = audio.currentTime;
  }
});

// Start play list =======================================
function showPlayList() {
  list.innerHTML = "";
  for (let i = 0; i < audiosData.length; i++) {
    const listItem = document.createElement("li");
    const songTitle = document.createElement("div");
    const songArtist = document.createElement("div");
    // set the text content for the song title and artist
    songTitle.textContent = audiosData[i].title;
    songArtist.textContent = audiosData[i].artist;
    // add the song title and artist to the list item
    listItem.appendChild(songTitle);
    listItem.appendChild(songArtist);
    // add the list item to the play list
    list.appendChild(listItem);
    list.querySelectorAll("li").forEach((li, index) => {
      li.addEventListener("click", () => {
        currentAudio = index; // update current audio index
        runAudio(); // load the selected audio file
        playAudio(); // play the selected audio file
        playList.style = "right:-100%;"; // close the play list
      });
    });
  }
}
listOpenBtn.onclick = function () {
  playList.style = "right:0%;";
  // clear previous list items
  list.innerHTML = "";
  showPlayList();
};
listCloseBtn.onclick = function () {
  playList.style = "right:-100%;";
};
addToList.onclick = function () {
  addContainer.style.right = "0%";
};
// =====================
const audioInput = document.getElementById("add-input");
const artistInput = document.getElementById("artist-input");
const saveButton = document.getElementById("save");
const canselButoon = document.getElementById("cancel");
let newAudio = null;

function resetInputs() {
  newAudio = null;
  artistInput.setAttribute("disabled", true);
  audioInput.value = "";
  artistInput.value = "";
}

audioInput.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];
  newAudio = {
    title: selectedFile.name,
    artist: "Unknown",
    file: "songs/" + selectedFile.name,
  };
  artistInput.removeAttribute("disabled");
  artistInput.focus();
});

saveButton.addEventListener("click", function () {
  if (newAudio) {
    if (artistInput.value !== "") {
      newAudio.artist = artistInput.value;
    }
    audiosData.push(newAudio);
    console.log(newAudio);
    addContainer.style.right = "100%";
    resetInputs();
  }
  showPlayList();
});

canselButoon.addEventListener("click", () => {
  resetInputs();
  addContainer.style.right = "100%";
});
