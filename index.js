'use strict';

class View {
  constructor() {
    this.huScore = document.querySelector('.js-hu-score');
    this.aiScore = document.querySelector('.js-ai-score');
    this.message = document.querySelector('.js-message');
    this.buttons = document.querySelectorAll('.js-button');
    this.huPickEl = document.querySelector('.js-hu-pick');
    this.aiPick = document.querySelector('.js-ai-pick');
    this.announcement = document.querySelector('.js-announcement');
    this.reset = document.querySelector('.js-reset');
    this.rounds = document.querySelector('.js-rounds');
  }

  displayScores(scores) {
    this.huScore.textContent = scores.huScore;
    this.aiScore.textContent = scores.aiScore;
  }

  displayMessage(message) {
    this.message.textContent = message;
  }

  displayPicks(picks) {
    this.huPickEl.textContent = picks.huPick;
    this.aiPick.textContent = picks.aiPick;
  }

  displayAnnouncement(announcement) {
    this.announcement.textContent = announcement;
  }

  displayRounds(rounds) {
    this.rounds.textContent = rounds;
  }

  addPlayEvents(handler) {
    this.buttons.forEach((button) => button.addEventListener('click', handler));
  }

  removePlayEvents(handler) {
    this.buttons.forEach((button) =>
      button.removeEventListener('click', handler)
    );
  }

  setDisabled(disabled) {
    this.buttons.forEach((button) => (button.disabled = disabled));
  }

  showResetButton() {
    this.reset.hidden = false;
  }

  hideResetButton() {
    this.reset.hidden = true;
  }

  addResetEvent(handler) {
    this.reset.addEventListener('click', handler);
  }
}

class Controller {
  constructor(view) {
    this.view = view;

    this.init();
  }

  play = (event) => {
    this.setHuPick(event.target.value);
    const randomNum = this.getRandomNum();
    this.setAiPick(this.model.choices[randomNum]);
    const result = this.getResult(this.model.picks);
    this.setMessageAndScores(result);
    this.setRounds();
    this.updateView();
    if (this.model.scores.huScore > 4 || this.model.scores.aiScore > 4) {
      this.stop();
    }
  };

  setHuPick(pick) {
    this.model.picks.huPick = pick;
  }

  setAiPick(pick) {
    this.model.picks.aiPick = pick;
  }

  setRounds() {
    this.model.rounds += 1;
  }

  getRandomNum() {
    return Math.floor(Math.random() * 3);
  }

  getResult({ huPick, aiPick }) {
    if (
      (huPick === 'rock' && aiPick === 'scissors') ||
      (huPick === 'paper' && aiPick === 'rock') ||
      (huPick === 'scissors' && aiPick === 'paper')
    ) {
      return 1;
    } else if (huPick === aiPick) {
      return 0;
    } else {
      return -1;
    }
  }

  setMessageAndScores(result) {
    let message,
      huPoint = 0,
      aiPoint = 0;
    if (result === 0) {
      message = 'Ties.';
    } else if (result === 1) {
      message = `You win! ${this.model.picks.huPick} beats ${this.model.picks.aiPick}.`;
      huPoint = 1;
    } else {
      message = `You lose! ${this.model.picks.aiPick} beats ${this.model.picks.huPick}.`;
      aiPoint = 1;
    }
    this.model.message = message;
    this.model.scores.huScore += huPoint;
    this.model.scores.aiScore += aiPoint;
  }

  setAnnouncement() {
    let announcement;
    if (this.model.scores.huScore > this.model.scores.aiScore) {
      announcement = "Congradulation! You're the final winner.";
    } else if (this.model.scores.huScore < this.model.scores.aiScore) {
      announcement = 'Try again! You lose.';
    } else {
      announcement = 'Nobody wins!';
    }
    this.model.announcement = announcement;
  }

  stop() {
    this.setAnnouncement();
    this.view.removePlayEvents(this.play);
    this.view.setDisabled(true);
    this.view.displayAnnouncement(this.model.announcement);
    this.view.showResetButton();
    this.view.addResetEvent(this.reset);
  }

  reset = () => {
    this.init();
  };

  setupModel() {
    return {
      choices: ['Rock', 'Paper', 'Scissors'],
      scores: {
        huScore: 0,
        aiScore: 0,
        maxScore: 5,
      },
      picks: {
        huPick: '',
        aiPick: '',
      },
      message: 'Welcome to Rock Paper Scissors',
      announcement: "Let's Play!",
      rounds: 0,
    };
  }

  updateView() {
    this.view.displayScores(this.model.scores);
    this.view.displayMessage(this.model.message);
    this.view.displayAnnouncement(this.model.announcement);
    this.view.displayPicks(this.model.picks);
    this.view.displayRounds(this.model.rounds);
  }

  init() {
    this.model = this.setupModel();
    this.updateView();
    this.view.addPlayEvents(this.play);
    this.view.setDisabled(false);
    this.view.hideResetButton();
  }
}

const app = new Controller(new View());
