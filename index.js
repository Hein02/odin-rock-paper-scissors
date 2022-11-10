// Ask user to type one of the following: 'rock', 'paper', 'scissors'
//   Assign the user's input to a variable named userPick
// Create a variable named computerPick
// Generate a random number ranging from 0 to 2
// Assign one of the following: 'rock', 'paper', 'scissors' to computerPick, based on the following conditions
//   IF randomNumber = 0, assign 'rock' to computerPick
//   ELSE IF randomNumber = 1, assign 'paper' to computerPick
//   ELSE, assign 'scissors' to computerPick
// Evaluate whether user wins or ties based on the inputs and print the result
//   IF userPick = 'rock' AND computerPick = 'scissors'
//     OR userPick = 'paper' AND computerPick = 'rock'
//     OR userPick = 'scissors' AND computerPick = 'paper',
//     print 'User wins'
//   ELSE IF userPick = computerPick, print 'Ties'
//   ELSE, print 'User loses'
'use strict';

function init() {
  let scores = { user: 0, computer: 0 };
  createMultipleRounds(5);

  function play() {
    let userPick, computerPick, result;
    userPick = getUserPick();
    computerPick = getComputerPick();
    result = checkResult(userPick, computerPick);
    updateScores(result, scores);
    printResult(result, userPick, computerPick);
  }

  function getUserPick() {
    let userPick;
    do {
      userPick = prompt(
        `Please type one of the following: 
                   1. rock
                   2. paper
                   3. scissors`
      );
      userPick = userPick.toLowerCase().trim();
    } while (!userPick || !validateInput(userPick));
    return userPick;
  }

  function validateInput(input) {
    const choices = ['rock', 'paper', 'scissors'];
    return choices.includes(input);
  }

  function getComputerPick() {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
      case 0:
        return 'rock';
      case 1:
        return 'paper';
      case 2:
        return 'scissors';
      default:
        return 'error';
    }
  }

  function checkResult(userPick, computerPick) {
    if (
      (userPick === 'rock' && computerPick == 'scissors') ||
      (userPick === 'paper' && computerPick === 'rock') ||
      (userPick === 'scissors' && computerPick === 'paper')
    ) {
      return 1;
    } else if (userPick === computerPick) {
      return 0;
    } else {
      return -1;
    }
  }

  function printResult(result, userPick, computerPick) {
    userPick = userPick.toUpperCase();
    computerPick = computerPick.toUpperCase();
    switch (result) {
      case 0:
        console.log('Ties!');
        break;
      case 1:
        console.log(`You win! ${userPick} beats ${computerPick}.`);
        break;
      case -1:
        console.log(`You lose! ${computerPick} beats ${userPick}.`);
        break;
      default:
        console.log('Error');
        break;
    }
  }

  function createMultipleRounds(counts = 5) {
    for (let i = 0; i < counts; i++) {
      play();
    }
    printFinalWinner(scores);
  }

  function updateScores(result, scores) {
    switch (result) {
      case 1:
        scores.user += 1;
        break;
      case -1:
        scores.computer += 1;
        break;
      default:
        break;
    }
  }

  function printFinalWinner(scores) {
    switch (true) {
      case scores.user > scores.computer:
        console.log("Congratulation! You're the final winner.");
        break;
      case scores.user < scores.computer:
        console.log('Try again! You lose.');
        break;
      default:
        console.log('Nobody wins!');
        break;
    }
  }
  console.log(
    `User Scores: ${scores.user}, Computer Scores: ${scores.computer}`
  );
}

window.onload = init;
