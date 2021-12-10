const myJson = getJsonObjFromFile("./data.json");

function getJsonObjFromFile(path) {
  let request = new XMLHttpRequest();
  request.open("GET", path, false);
  request.send(null);
  return JSON.parse(request.responseText);
}

/*arrays to save data */
let titles = [];
let days = [];
let weeks = [];
let months = [];

myJson.map(function (card) {
  titles.push(card.title);
  days.push(card.timeframes.daily);
  weeks.push(card.timeframes.weekly);
  months.push(card.timeframes.monthly);
});

//built  6 cards
let cardContainerItemHTML =
  document.getElementsByClassName("allCards")[0].innerHTML;
let htmlCards = "";
for (let i = 0; i < 6; i++) {
  htmlCards += cardContainerItemHTML;
}

document.getElementsByClassName("allCards")[0].innerHTML = htmlCards;

let cardsContainer = document.getElementsByClassName("card-container");
let cardsTitles = document.getElementsByClassName("title");
let currents = document.getElementsByClassName("current");
let prevs = document.getElementsByClassName("prev");
let miniIcons = document.getElementsByClassName("icon");

/*colors */
let colorWork = "hsl(15, 100%, 70%)";
let colorPlay = "hsl(195, 74%, 62%)";
let colorStudy = "hsl(348, 100%, 68%)";
let colorExercise = "hsl(145, 58%, 55%)";
let colorSocial = "hsl(264, 64%, 52%)";
let colorSelfCare = "hsl(43, 84%, 65%)";
let colors = [
  colorWork,
  colorPlay,
  colorStudy,
  colorExercise,
  colorSocial,
  colorSelfCare,
];

/*icons */
let iconWork = "url(../images/icon-work.svg)";
let iconPlay = "url(../images/icon-play.svg)";
let iconStudy = "url(../images/icon-study.svg)";
let iconExercise = "url(../images/icon-exercise.svg)";
let iconSocial = "url(../images/icon-social.svg)";
let iconSelfCare = "url(../images/icon-self-care.svg)";
let icons = [
  iconWork,
  iconPlay,
  iconStudy,
  iconExercise,
  iconSocial,
  iconSelfCare,
];

/*set the cards content for the first time */
for (let i = 0; i < cardsTitles.length; i++) {
  cardsContainer[i].style.backgroundColor = colors[i];
  miniIcons[i].style.backgroundImage = icons[i];
  cardsTitles[i].innerText = titles[i];
  currents[i].innerText = days[i].current + "hrs";
  prevs[i].innerText = "Last Day - " + days[i].previous + "hrs";
}

let btns = document.getElementsByClassName("btn");
let btnVisited = null;
let desaturatedBlue = "hsl(235, 45%, 61%)";

/*when user click on the btns */
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function (event) {
    let currentBtnTxt = event.target.innerHTML;
    let currentBtn = event.target;
    if (btnVisited !== null) {
      btnVisited.style.color = desaturatedBlue;
    }
    currentBtn.style.color = "white";
    btnVisited = currentBtn;
    if (currentBtnTxt === "Daily") {
      showDaily();
    } else if (currentBtnTxt === "Weekly") {
      showWeekly();
    } else if (currentBtnTxt === "Monthly") {
      showMonthly();
    }
  });
}

/*change the display according to user click */
function showDaily() {
  for (let i = 0; i < cardsTitles.length; i++) {
    currents[i].innerText = days[i].current + "hrs";
    prevs[i].innerText = "Last Day - " + days[i].previous + "hrs";
  }
  /*play the animation */
  addAnimationFadeIn();
}

function showWeekly() {
  for (let i = 0; i < cardsTitles.length; i++) {
    currents[i].innerText = weeks[i].current + "hrs";
    prevs[i].innerText = "Last Week - " + weeks[i].previous + "hrs";
  }
  /*play the animation */
  addAnimationFadeIn();
}

function showMonthly() {
  for (let i = 0; i < cardsTitles.length; i++) {
    currents[i].innerText = months[i].current + "hrs";
    prevs[i].innerText = "Last Month - " + months[i].previous + "hrs";
  }
  /*play the animation */
  addAnimationFadeIn();
}

/*add animation class*/
let allCardTimes = document.querySelectorAll(".card-times");
function addAnimationFadeIn() {
  let effectName = "fade-in-effect";
  allCardTimes.forEach(function (thisCardTime) {
    if (thisCardTime.classList.contains(effectName) === true) {
      thisCardTime.classList.remove(effectName);
    }
    forceElementToRefresh(thisCardTime);
    thisCardTime.classList.add(effectName);
  });
}

function forceElementToRefresh(element) {
  element.offsetHeight;
}
