const callBtn = document.querySelectorAll("#call-btn");
const callTitle = document.getElementById("call-title");
const callNumber = document.getElementById("call-number");
const heartCount = document.getElementById("heart-count");
const coinsCount = document.getElementById("coins-count");
const copyCount = document.getElementById("copy-count");
const clearBtn = document.getElementById("clear-btn");
const copyBtn = document.querySelectorAll(".btn-area button:first-child");
const hearBtn = document.querySelectorAll(".fa-heart");

let coins = 100;
let hearts = 0;
let copy = 0;

for (const callNum of callBtn) {
  callNum.addEventListener("click", function () {
    if (coins < 20) {
      alert("Your coins Not Found.");
      return;
    }
    const card = callNum.parentElement.parentElement;
    const cardTitle = card.querySelector("span").innerText;
    const callNumber = card.querySelector(".call-area span").innerText;
    alert(`${cardTitle} and Helpline Number ${callNumber}`);
    coins = coins - 20;
    coinsCount.innerText = coins;

    addHistory(cardTitle, callNumber);
  });
}

//copy button
for (const copied of copyBtn) {
  copied.addEventListener("click", function () {
    const copyArea = copied.parentElement.parentElement;
    const callNumber = copyArea.querySelector('.call-area span').innerText;
    
    navigator.clipboard.writeText(callNumber).then(() => {
       alert(`Number ${callNumber} Copied`)
      copy = copy + 1;
      copyCount.innerText = copy;
    });
  });
}

//hear icon value increase
for (const heartIcon of hearBtn) {
  heartIcon.addEventListener("click", function () {
    hearts = hearts + 1;
    heartCount.innerText = hearts;
  });
}

function getCurrentTime() {
  const d = new Date();
  let hours = d.getHours().toString();
  const minutes = d.getMinutes();
  const second = d.getSeconds();
  const amToPm = hours >= 12 ? "PM" : "AM";
  if (hours >= 12) {
    hours = hours - 12;
  }
  if (hours === 12) {
    hours = 12;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (second < 10) {
    second = "0" + second;
  }

  return `${hours}:${minutes}:${second} ${amToPm}`;
}

// history functionality added
function addHistory(cardTitle, callNumber) {
  const historyDiv = document.createElement("div");
  const historyArea = document.querySelector(".history-area");
  historyDiv.classList.add("card-history");
  historyDiv.innerHTML = `
     <div>
            <span>${cardTitle}</span>
            <p>${callNumber}</p>
        </div>
        <span>${getCurrentTime()}</span>
    
    `;
  historyArea.appendChild(historyDiv);
}



//clear all history
clearBtn.addEventListener("click", function () {
  const historyItems = document.querySelectorAll(".card-history");
  for (const history of historyItems) {
    history.remove();
  }
});
