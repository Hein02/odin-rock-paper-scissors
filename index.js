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

let userPick, computerPick, randomNumber;

userPick = prompt(
  `Please type one of the following: 
   1. rock
   2. paper
   3. scissors`
);

randomNumber = Math.floor(Math.random() * 2);

if (randomNumber === 0) {
  computerPick = 'rock';
} else if (randomNumber === 1) {
  computerPick = 'paper';
} else {
  computerPick = 'scissors';
}

if (
  (userPick === 'rock' && computerPick == 'scissors') ||
  (userPick === 'paper' && computerPick === 'rock') ||
  (userPick === 'scissors' && computerPick === 'paper')
) {
  console.log(`User wins`);
} else if (userPick === computerPick) {
  console.log('Ties');
} else {
  console.log(`User loses`);
}
