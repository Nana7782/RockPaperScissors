console.log("läuft");

let moves: number = 0;
const choosenRounds: HTMLElement | null = document.getElementById("showRounds");
let round: NodeListOf<HTMLInputElement> = document.getElementsByName(
  "round"
) as NodeListOf<HTMLInputElement>;

// HOW MANY ROUNDS
const displayRounds = (): void => {
  for (let i: number = 0; i < round.length; i++) {
    if (round[i].checked) {
      choosenRounds?.textContent = round[i].value;
      choosenRounds.style.display = "none";
      return;
    }
  }
};

const fullGame = (): void => {
  let userScore: number = 0;
  let computerScore: number = 0;

  // LETS PLAY
  const playGame = (): void => {
    // USER Options
    const userOptions: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll(".options button");

    // COMPUTER Options
    const computerOptions: string[] = ["rock 🪨", "paper 📄", "scissors ✂️"];

    userOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const computerNumber: number = Math.floor(Math.random() * 3);
        const computerChoice: string = computerOptions[computerNumber];

        const countMoves: HTMLElement | null =
          document.querySelector(".countMoves");
        moves++;
        countMoves.innerText = `${0 + moves} ${"/ "}`.concat(
          choosenRounds.textContent || ""
        );

        const usersDisplay: HTMLElement | null =
          document.querySelector(".usersPick");
        const compsDisplay: HTMLElement | null =
          document.querySelector(".computersPick");
        usersDisplay.textContent = `${"You picked: "}${this.textContent}`;
        compsDisplay.textContent = `${"Comp picked: "}${computerChoice}`;

        // CALL BACK WHOWINS()
        whoWins(this.textContent, computerChoice);

        if (round[i].value == 5 && moves == 5) {
          gameOver(userOptions, countMoves);
        } else if (round[i].value == 10 && moves == 10) {
          gameOver(userOptions, countMoves);
        } else if (round[i].value == 15 && moves == 15) {
          gameOver(userOptions, countMoves);
        } else if (round[i].value == 20 && moves == 20) {
          gameOver(userOptions, countMoves);
        }
      });
    });
  };

  // DEFINE WINNER
  const whoWins = (user: string, computerChoice: string): void => {
    const text: HTMLElement | null = document.querySelector(".output_text");

    if (user === computerChoice) {
      text.textContent = "A DRAW!";
      text.style.color = "orange";
      return;
    }

    if (user === "rock 🪨") {
      if (computerChoice === "scissors ✂️") {
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

    if (user === "paper 📄") {
      if (computerChoice === "scissors ✂️") {
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

    if (user === "scissors✂️") {
      if (computerChoice === "rock 🪨") {
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
  };

  // Count Results
  const resultCounter = (): void => {
    const userCounter: HTMLElement | null =
      document.querySelector(".userResult");
    const computerCounter: HTMLElement | null =
      document.querySelector(".computerResult");

    userCounter.textContent = `${"Score: "}`.concat(userScore.toString());
    computerCounter.textContent = `${"Score: "}`.concat(
      computerScore.toString()
    );
  };
  playGame();

  const gameOver = (
    userOptions: NodeListOf<HTMLButtonElement>,
    countMoves: HTMLElement | null
  ): void => {
    const chooseMove: HTMLElement | null = document.querySelector(".move");
    const result: HTMLElement | null = document.querySelector(".resultText");

    userOptions.forEach((option) => {
      option.style.display = "none";
    });

    if (userScore > computerScore) {
      result.style.fontSize = "2.5rem";
      result.innerText = "You win the game 🙂";
      result.style.color = "green";
    } else if (userScore < computerScore) {
      result.style.fontSize = "2.5rem";
      result.innerText = "You lost the game 🙁";
      result.style.color = "red";
    } else {
      result.style.fontSize = "2.5rem";
      result.innerText = "Its a draw 😬";
      result.style.color = "orange";
    }
  };
};
fullGame();

// RESTART BUTTON
const restartBtn: HTMLElement | null = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  location.reload();
});
