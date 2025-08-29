const callBtn = document.querySelectorAll("#call-btn");
const callTitle = document.getElementById("#call-title");
const callNumber = document.getElementById("#call-number");

let coins = 100;
let like = 0;

for (const callNum of callBtn) {
  callNum.addEventListener("click", function () {
    if(coins <20){
        alert('Your coins Not Found.')
        return;
    }
    const card = callNum.parentElement.parentElement;
    console.log(card);
    const cardTitle = card.querySelector('span').innerText;
    const callNumber = card.querySelector('.call-area span').innerText;   
    console.log(cardTitle, callNumber);
    alert('calling' + callTitle + 'provide' + callNumber)
     coins = coins - 20;

  });
}
