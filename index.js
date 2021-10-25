const wordContainer = document.getElementById('word-container');
const popupContainer = document.getElementById('popup-container');
const notificationContainer = document.getElementById('notification-container');
const wrongLetterContainer = document.getElementById('wrong-letter-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');

const figureParts = document.getElementsByClassName('figure-part');

// Random word generator
const words = ['Rifat', 'Mahmud', 'Rawnak', 'Mahadee'];
let selectedWord =
  words[Math.floor(Math.random() * words.length)].toLowerCase();

let correctLetters = [];
let wrongLetters = [];

// display word function
const displayWord = () => {
  wordContainer.innerHTML = `${selectedWord
    .split('')
    .map(
      letter =>
        `<div class = 'letter'>${
          correctLetters.includes(letter) ? letter : ''
        }</div>`
    )
    .join('')}`;

  const innerWord = wordContainer.innerText.replaceAll('\n', '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations ! You Have Won The Game 💰`;
    popupContainer.style.display = 'flex';
  }
};

// show notification
const showNotification = () => {
  notificationContainer.classList.add('show');
  setTimeout(() => {
    notificationContainer.classList.remove('show');
  }, 2000);
};

// update wrong letters
const updateWrongLetters = () => {
  wrongLetterContainer.innerHTML = `
  ${wrongLetters.length > 0 ? `<h4>Wrong</h4>` : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

  // uddate figure parts
  const parts = [...figureParts];
  parts.forEach((part, index) => {
    if (index < wrongLetters.length) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (parts.length === wrongLetters.length) {
    finalMessage.innerText = `Unfortunatly ! You Lose the Game 😒`;
    popupContainer.style.display = 'flex';
  }
};

// play again game function
const playAgain = () => {
  popupContainer.style.display = 'none';
  wrongLetters = [];
  correctLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLetters();
};

// Keydown event handler
window.addEventListener('keydown', e => {
  const letter = e.key;
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      displayWord();
    } else {
      showNotification();
    }
  } else {
    if(!wrongLetters.includes(letter)){
      wrongLetters.push(letter);
      updateWrongLetters();
    }else {
      showNotification();
    }
  }
});

// Play again button event listener
playAgainBtn.addEventListener('click', playAgain);

displayWord();

