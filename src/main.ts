let moves: number = 0;
const choosenRounds = document.getElementById(
  "showRounds"
) as HTMLParagraphElement;
let round = document.getElementsByName("round") as NodeListOf<HTMLInputElement>;

const displayRounds = () => {
  for (let i: number = 0; i < round.length; i++) {
    if (round[i].checked) {
      choosenRounds.textContent = round[i].value;
      choosenRounds.style.display = "none";
      return;
    }
  }
};

const fullGame = (): void => {
  let userScore: number = 0;
  let computerScore: number = 0;

  const playGame = (): void => {
    const userOptions = document.querySelectorAll(".options button");

    // COMPUTER Options
    const computerOptions: string[] = ["✊", "✋", "✌️"];

    userOptions.forEach((option: Element) => {
      option.addEventListener("click", function (this: HTMLElement) {
        const computerNumber: number = Math.floor(Math.random() * 3);
        const computerChoice: string = computerOptions[computerNumber];

        const countMoves = document.querySelector(".countMoves");
        moves++;
        countMoves.innerText = `${0 + moves} ${"/ "}`.concat(
          choosenRounds.textContent || ""
        );

        const usersDisplay = document.querySelector(
          ".usersPick"
        ) as HTMLElement;
        const compsDisplay = document.querySelector(
          ".computersPick"
        ) as HTMLElement;
        usersDisplay.textContent = `${"You picked: "}${this.textContent}`;
        compsDisplay.textContent = `${"Comp picked: "}${computerChoice}`;

        whoWins(this.textContent || "", computerChoice);

        if (round[0].value === "5" && moves === 5) {
          gameOver(userOptions, countMoves);
        } else if (round[0].value === "10" && moves === 10) {
          gameOver(userOptions, countMoves);
        } else if (round[0].value === "15" && moves === 15) {
          gameOver(userOptions, countMoves);
        } else if (round[0].value === "20" && moves === 20) {
          gameOver(userOptions, countMoves);
        }
      });
    });
  };
  const whoWins = (user: string, computerChoice: string): void => {
    const text = document.querySelector(".output_text") as HTMLElement;

    if (user === computerChoice) {
      text.textContent = "A DRAW!";
      text.style.color = "orange";
      return;
    }

    if (user === "✊") {
      if (computerChoice === "✌️") {
        text.textContent = "YOU WIN!";
        text.style.color = "green";
        userScore++;
        resultCounter();
        return;
      } else {
        text.textContent = "YOU LOOSE!";
        text.style.color = "red";
        computerScore++;
        resultCounter();
        return;
      }
    }

    if (user === "✋") {
      if (computerChoice === "✌️") {
        text.textContent = "YOU LOOSE";
        text.style.color = "red";
        computerScore++;
        resultCounter();
        return;
      } else {
        text.textContent = "YOU WIN";
        text.style.color = "green";
        userScore++;
        resultCounter();
        return;
      }
    }

    if (user === "✌️") {
      if (computerChoice === "✊") {
        text.textContent = "YOU LOOSE";
        text.style.color = "red";
        computerScore++;
        resultCounter();
        return;
      } else {
        text.textContent = "YOU WIN";
        text.style.color = "green";
        resultCounter();
        return;
      }
    }
  };
  // Count Results
  const resultCounter = (): void => {
    const userCounter = document.querySelector(".userResult") as HTMLElement;
    const computerCounter = document.querySelector(
      ".computerResult"
    ) as HTMLElement;

    userCounter.textContent = `Score: ${userScore}`;
    computerCounter.textContent = `Score: ${computerScore}`;
  };
};

const gameOver = (userOptions: string[]): void => {
  const chooseMove = document.querySelector(".move") as HTMLElement;
  const result = document.querySelector(".resultText") as HTMLElement;

  if (userScore > computerScore) {
    result.innerText = "You win the game ";
    result.style.color = "green";
  } else if (userScore < computerScore) {
    result.innerText = "You lost the game ";
    result.style.color = "red";
  } else {
    result.innerText = "Its a draw ";
    result.style.color = "orange";
  }
};

fullGame();

// RESTART BUTTON
const restartBtn = document.querySelector(".restart") as HTMLElement;
restartBtn.addEventListener("click", () => {
  location.reload();
});
