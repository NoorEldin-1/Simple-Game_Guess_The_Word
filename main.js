const inputsContainer = document.querySelector(".inputs");
const checkBtn = document.querySelector(".check");
const hintBtn = document.querySelector(".hint");
const hintSpan = document.querySelector(".hint span");
const message = document.querySelector(".message");
const words = ["clouds", "fables", "stamps", "rested", "pocket"];
let randomWord = words[Math.floor(Math.random() * words.length)];
let numberOfTries = 5;
let numberOfLetters = 6;
let numberOfHints = 2;
hintSpan.textContent = numberOfHints;
let currentTry = 1;
for (let i = 1; i <= numberOfTries; i++) {
  const tryDiv = document.createElement("div");
  tryDiv.classList.add(`try-${i}`);
  tryDiv.innerHTML = `<span>try ${i}</span>`;
  for (let j = 1; j <= numberOfLetters; j++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.id = `try-${i}-letter-${j}`;
    tryDiv.appendChild(input);
  }
  if (i > 1) {
    tryDiv.classList.add("disable");
  }
  inputsContainer.appendChild(tryDiv);
}
inputsContainer.children[0].children[1].focus();
let inputs = document.querySelectorAll("input");
let disableInputs = document.querySelectorAll(".disable input");
let tryDivs = Array.from(document.querySelectorAll(".inputs > div"));

disableInputs.forEach((x) => {
  x.disabled = true;
});

inputs.forEach((x, i) => {
  x.addEventListener("input", (e) => {
    x.value = x.value.toLowerCase();
    const nextInput = i + 1;
    if (nextInput < inputs.length) inputs[nextInput].focus();
  });
  x.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      const prevInput = i - 1;
      if (prevInput >= 0) inputs[prevInput].focus();
    }
    if (e.key === "ArrowRight") {
      const nextInput = i + 1;
      if (nextInput < inputs.length) inputs[nextInput].focus();
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      e.target.value = "";
      const prevInput = i - 1;
      if (prevInput >= 0) inputs[prevInput].focus();
    }
  });
});

checkBtn.addEventListener("click", () => {
  let guess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    let currentInput = document.getElementById(`try-${currentTry}-letter-${i}`);
    let currentLetter = currentInput.value;
    let randomLetter = randomWord[i - 1];
    if (currentLetter === randomLetter) {
      currentInput.classList.add("in-place");
    } else if (randomWord.includes(currentLetter)) {
      currentInput.classList.add("not-in-place");
      guess = false;
    } else {
      currentInput.classList.add("wrong");
      guess = false;
    }
  }
  if (guess) {
    message.innerHTML = `You Win The Word Is <span>${randomWord}</span>`;
    tryDivs.forEach((x) => x.classList.add("disable"));
    inputs.forEach((x) => (x.disabled = true));
    checkBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    let currentTryDiv = document.querySelector(`.try-${currentTry}`);
    let currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryDiv.classList.add("disable");
    currentTryInputs.forEach((x) => (x.disabled = true));

    currentTry++;

    let nextTryDiv = document.querySelector(`.try-${currentTry}`);
    let nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    if (nextTryDiv) {
      nextTryDiv.classList.remove("disable");
      nextTryInputs.forEach((x) => (x.disabled = false));
      nextTryInputs[0].focus();
    } else {
      checkBtn.disabled = true;
      hintBtn.disabled = true;
      message.innerHTML = `You Lose The Word Is <span>${randomWord}</span>`;
    }
  }
});

hintBtn.addEventListener("click", () => {
  hintSpan.textContent--;
  if (hintSpan.textContent === "0") {
    hintBtn.disabled = true;
  }
  const enableInputs = Array.from(
    document.querySelectorAll("input:not([disabled])")
  );
  const emptyEnableInputs = Array.from(enableInputs).filter(
    (x) => x.value === ""
  );
  const randomIndex = Math.floor(Math.random() * emptyEnableInputs.length);
  const randomInput = emptyEnableInputs[randomIndex];
  randomInput.value = randomWord[enableInputs.indexOf(randomInput)];
});
