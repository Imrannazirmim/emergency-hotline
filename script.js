let callButtons = document.querySelectorAll("#call-btn");

let coins = 100;
let hearts = 0;

// Add click event to each call button - simple for loop
for (let i = 0; i < callButtons.length; i++) {
  const callBtn = callButtons[i];
  callBtn.addEventListener("click", function () {
    if (coins < 20) {
      alert("Your coins lost!");
      return;
    }

    // Find the card - go up from button
    let button = this;
    let card = button.parentElement.parentElement; // btn-area -> card

    // Get service name - first span in card
    let serviceName = card.querySelector("span").textContent;

    // Get phone number - span inside call-area
    let phoneNumber = card.querySelector(".call-area span").textContent;

    // Show alert
    alert("Calling " + serviceName + " at " + phoneNumber);

    // Reduce coins by 20
    coins = coins - 20;
    updateCoins();

    // Add to history
    addToHistory(serviceName, phoneNumber);
  });
}

// Get all copy buttons - simple way
let allButtons = document.querySelectorAll("button");

// Add click event to copy buttons - simple for loop
for (let j = 0; j < allButtons.length; j++) {
  // Check if button has "Copy" text and is not call button
  if (
    allButtons[j].textContent.includes("Copy") &&
    allButtons[j].id !== "call-btn"
  ) {
    allButtons[j].onclick = function () {
      // Check coins
      if (coins < 20) {
        alert("Not enough coins! You need 20 coins to copy.");
        return;
      }

      // Find the card - go up from button
      let button = this;
      let card = button.parentElement.parentElement; // btn-area -> card

      // Get service name - first span in card
      let serviceName = card.querySelector("span").textContent;

      // Get phone number - span inside call-area
      let phoneNumber = card.querySelector(".call-area span").textContent;

      // Copy to clipboard
      copyText(phoneNumber);
      alert("Phone number " + phoneNumber + " copied!");

      // Reduce coins by 20, increase hearts by 1
      coins = coins - 20;
      hearts = hearts + 1;
      updateCoins();
      updateHearts();

      // Add to history
      addToHistory(serviceName + " (Copied)", phoneNumber);
    };
  }
}

// Clear history button
let clearButton = document.querySelector(".history-title button");
clearButton.onclick = function () {
  let historyItems = document.querySelectorAll(".card-history");
  for (let k = 0; k < historyItems.length; k++) {
    historyItems[k].remove();
  }
  alert("History cleared!");
};

// Heart buttons in cards
let heartButtons = document.querySelectorAll(".fa-heart");
for (let l = 0; l < heartButtons.length; l++) {
  heartButtons[l].onclick = function () {
    // Check if heart is empty (fa-regular) or filled (fa-solid)
    if (this.classList.contains("fa-regular")) {
      // Make it filled
      this.classList.remove("fa-regular");
      this.classList.add("fa-solid");
      this.style.color = "#ff6b6b";
      hearts = hearts + 1;
    } else {
      // Make it empty
      this.classList.remove("fa-solid");
      this.classList.add("fa-regular");
      this.style.color = "";
      hearts = hearts - 1;
      if (hearts < 0) hearts = 0;
    }
    updateHearts();
  };
}

// Initialize display
updateCoins();
updateHearts();

// Function to update coins display
function updateCoins() {
  const coinElement = document.querySelector(".list li:nth-child(2)");
  coinElement.innerHTML = coins + ' <img src="./assets/coin.png" alt="coin" />';
}

// Function to update hearts display
function updateHearts() {
  const heartElement = document.querySelector(".list li:nth-child(1)");
  heartElement.innerHTML =
    hearts + ' <img src="./assets/heart.png" alt="heart" />';
}

// Function to get current time
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Add zero if single digit
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  const ampm = "AM";
  if (hours >= 12) {
    ampm = "PM";
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  return hours + "." + minutes + "." + seconds + " " + ampm;
}

// Function to add item to history
function addToHistory(serviceName, phoneNumber) {
  let historyTitle = document.querySelector(".history-title");
  let newHistory = document.createElement("div");
  newHistory.className = "card-history";
  newHistory.innerHTML =
    "<div><span>" +
    serviceName +
    "</span><p>" +
    phoneNumber +
    "</p></div><span>" +
    getCurrentTime() +
    "</span>";

  // Add after history title
  historyTitle.insertAdjacentElement("afterend", newHistory);
}

// Copy text to clipboard - simple version
function copyText(text) {
  let textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

// Get all call buttons
