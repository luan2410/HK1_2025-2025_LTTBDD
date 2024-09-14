// challenges 1
// Data 1
let markMass1 = 78;
let markHeight1 = 1.69;
let johnMass1 = 92;
let johnHeight1 = 1.95;

// Data 2
let markMass2 = 95;
let markHeight2 = 1.88;
let johnMass2 = 85;
let johnHeight2 = 1.76;

// Calculate BMI
const calculateBMI = (mass, height) => mass / (height ** 2);

let markBMI1 = calculateBMI(markMass1, markHeight1);
let johnBMI1 = calculateBMI(johnMass1, johnHeight1);
let markBMI2 = calculateBMI(markMass2, markHeight2);
let johnBMI2 = calculateBMI(johnMass2, johnHeight2);

// Boolean variable
let markHigherBMI1 = markBMI1 > johnBMI1;
let markHigherBMI2 = markBMI2 > johnBMI2;

console.log(markBMI1, johnBMI1, markHigherBMI1); // Output for Data 1
console.log(markBMI2, johnBMI2, markHigherBMI2); // Output for Data 2

// challenges 2
// Improved output
if (markHigherBMI1) {
    console.log(`Mark's BMI (${markBMI1.toFixed(1)}) is higher than John's (${johnBMI1.toFixed(1)})!`);
  } else {
    console.log(`John's BMI (${johnBMI1.toFixed(1)}) is higher than Mark's (${markBMI1.toFixed(1)})!`);
  }
  
  if (markHigherBMI2) {
    console.log(`Mark's BMI (${markBMI2.toFixed(1)}) is higher than John's (${johnBMI2.toFixed(1)})!`);
  } else {
    console.log(`John's BMI (${johnBMI2.toFixed(1)}) is higher than Mark's (${markBMI2.toFixed(1)})!`);
  }
  
  // challenges 3
  // Test data
const dolphinsScores1 = [96, 108, 89];
const koalasScores1 = [88, 91, 110];
const dolphinsScoresBonus1 = [97, 112, 101];
const koalasScoresBonus1 = [109, 95, 123];
const dolphinsScoresBonus2 = [97, 112, 101];
const koalasScoresBonus2 = [109, 95, 106];

// Calculate average score
const calculateAverage = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length;

const dolphinsAvg1 = calculateAverage(dolphinsScores1);
const koalasAvg1 = calculateAverage(koalasScores1);
const dolphinsAvgBonus1 = calculateAverage(dolphinsScoresBonus1);
const koalasAvgBonus1 = calculateAverage(koalasScoresBonus1);
const dolphinsAvgBonus2 = calculateAverage(dolphinsScoresBonus2);
const koalasAvgBonus2 = calculateAverage(koalasScoresBonus2);

// Determine winner
const determineWinner = (dolphinsAvg, koalasAvg) => {
  if (dolphinsAvg > koalasAvg) {
    console.log(`Dolphins win with an average score of ${dolphinsAvg.toFixed(1)}!`);
  } else if (koalasAvg > dolphinsAvg) {
    console.log(`Koalas win with an average score of ${koalasAvg.toFixed(1)}!`);
  } else {
    console.log(`It's a draw with both teams scoring an average of ${dolphinsAvg.toFixed(1)}!`);
  }
};

determineWinner(dolphinsAvg1, koalasAvg1);

// Bonus 1 and 2
const determineWinnerWithMinScore = (dolphinsAvg, koalasAvg) => {
  if (dolphinsAvg >= 100 && dolphinsAvg > koalasAvg) {
    console.log(`Dolphins win with an average score of ${dolphinsAvg.toFixed(1)}!`);
  } else if (koalasAvg >= 100 && koalasAvg > dolphinsAvg) {
    console.log(`Koalas win with an average score of ${koalasAvg.toFixed(1)}!`);
  } else if (dolphinsAvg >= 100 && koalasAvg >= 100 && dolphinsAvg === koalasAvg) {
    console.log(`It's a draw with both teams scoring an average of ${dolphinsAvg.toFixed(1)}!`);
  } else {
    console.log(`No team wins the trophy.`);
  }
};

determineWinnerWithMinScore(dolphinsAvgBonus1, koalasAvgBonus1);
determineWinnerWithMinScore(dolphinsAvgBonus2, koalasAvgBonus2);

// challenges 4

// Calculate the tip using ternary operator
const calcTip = (bill) => (bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2);

// Test data
const bills = [275, 40, 430];

// Calculate tips and total values
bills.forEach(bill => {
  const tip = calcTip(bill);
  const total = bill + tip;
  console.log(`The bill was ${bill}, the tip was ${tip.toFixed(2)}, and the total value ${total.toFixed(2)}`);
});

//  5
// Arrow function to calculate average
const calcAverage = (scores) => scores.reduce((a, b) => a + b, 0) / scores.length;

// Test data
const dolphinsScores1 = [44, 23, 71];
const koalasScores1 = [65, 54, 49];
const dolphinsScores2 = [85, 54, 41];
const koalasScores2 = [23, 34, 27];

// Calculate averages
const dolphinsAvg1 = calcAverage(dolphinsScores1);
const koalasAvg1 = calcAverage(koalasScores1);
const dolphinsAvg2 = calcAverage(dolphinsScores2);
const koalasAvg2 = calcAverage(koalasScores2);

// Function to check winner
const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log('No team wins!');
  }
};

// Determine winners
checkWinner(dolphinsAvg1, koalasAvg1);
checkWinner(dolphinsAvg2, koalasAvg2);


///6 
 // Function to calculate tip
const calcTip = (bill) => (bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2);

// Test the function
console.log(calcTip(100)); // Should return 15

// Test data
const bills = [125, 555, 44];

// Calculate tips and total values
const tips = bills.map(calcTip);
const totals = bills.map((bill, index) => bill + tips[index]);

console.log('Bills:', bills);
console.log('Tips:', tips);
console.log('Totals:', totals);

// 7 
// Create objects for Mark and John
const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function() {
      this.bmi = this.mass / (this.height ** 2);
      return this.bmi;
    }
  };
  
  const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function() {
      this.bmi = this.mass / (this.height ** 2);
      return this.bmi;
    }
  };
  
  // Calculate BMIs
  mark.calcBMI();
  john.calcBMI();
  
  // Log who has the higher BMI
  if (mark.bmi > john.bmi) {
    console.log(`${mark.fullName}'s BMI (${mark.bmi.toFixed(1)}) is higher than ${john.fullName}'s (${john.bmi.toFixed(1)})!`);
  } else {
    console.log(`${john.fullName}'s BMI (${john.bmi.toFixed(1)}) is higher than ${mark.fullName}'s (${mark.bmi.toFixed(1)})!`);
  }

  // 8
  // Test data
const bills = [22, 295, 176, 440, 37, 105, 10, 110];

// Empty arrays for tips and totals
const tips = [];
const totals = [];

// Calculate tips and totals using a loop
for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(bills[i] + tip);
}

console.log('Bills:', bills);
console.log('Tips:', tips);
console.log('Totals:', totals);
