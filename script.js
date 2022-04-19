const newBtn = document.getElementById("newGame");
//const roll = document.getElementById("roll");
//const hold = document.getElementById("hold");
const rolls = document.getElementsByName("roll");
const holds = document.getElementsByName("hold");
const player1Names = document.getElementsByName("label1");
const player2Names = document.getElementsByName("label2");
const dots = document.getElementsByName("dot");
const img = document.getElementsByTagName("img")[0];
const current1 = document.getElementById("current1");
const current2 = document.getElementById("current2");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
let tour = 1;

function activePlayer(tourNumb) {
  if (tourNumb === 1) {
    player1Names.forEach((name) => {
      name.classList.remove("text-opacity-25");
    });
    player2Names.forEach((name) => {
      name.classList.add("text-opacity-25");
    });
    dots[0].style = "display: initial;";
    dots[1].style = "display: none;";
  } else {
    player2Names.forEach((name) => {
      name.classList.remove("text-opacity-25");
    });
    player1Names.forEach((name) => {
      name.classList.add("text-opacity-25");
    });
    dots[1].style = "display: initial;";
    dots[0].style = "display: none;";
  }
}

function gagne(name) {
  name.innerHTML = "GAGNE !";
  name.classList.add("text-danger");
  name.classList.remove("text-black");
}

const joueur1 = {
  score: 0,
  current: 0,
};
const joueur2 = {
  score: 0,
  current: 0,
};

newBtn.addEventListener("click", () => {
  joueur1.score = 0;
  joueur1.current = 0;
  joueur2.score = 0;
  joueur2.current = 0;
  tour = 1;
  activePlayer(tour);
});

rolls.forEach((roll) => {
  roll.addEventListener("click", () => {
    let numb = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    switch (numb) {
      case 1:
        img.src = "./images/dice-1.png";
        if (tour === 1) {
          joueur1.current = 0;
          current1.innerHTML = 0;
        } else {
          joueur2.current = 0;
          current2.innerHTML = 0;
        }
        tour = tour === 1 ? 2 : 1;
        numb = 0;
        activePlayer(tour);
        break;
      case 2:
        img.src = "./images/dice-2.png";
        break;
      case 3:
        img.src = "./images/dice-3.png";
        break;
      case 4:
        img.src = "./images/dice-4.png";
        break;
      case 5:
        img.src = "./images/dice-5.png";
        break;
      case 6:
        img.src = "./images/dice-6.png";
        break;
    }
    if (tour === 1) {
      joueur1.current += numb;
      current1.innerHTML = joueur1.current;
    } else {
      joueur2.current += numb;
      current2.innerHTML = joueur2.current;
    }
  });
});

holds.forEach((hold) => {
  hold.addEventListener("click", () => {
    if (tour === 1) {
      joueur1.score += joueur1.current;
      joueur1.current = 0;
      current1.innerHTML = 0;
      score1.innerHTML = joueur1.score;
      tour = 0;
    } else {
      joueur2.score += joueur2.current;
      joueur2.current = 0;
      current2.innerHTML = 0;
      score2.innerHTML = joueur2.score;
      tour = 1;
    }
    if (joueur1.score >= 100) {
      player1Names.forEach((name) => {
        gagne(name);
      });
      tour = 3;
    } else if (joueur2.score >= 100) {
      player2Names.forEach((name) => {
        gagne(name);
      });
      tour = 3;
    }
    if (tour !== 3) {
      activePlayer(tour);
    }
  });
});
