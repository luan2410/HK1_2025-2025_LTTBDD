// 1 Print numbers from 1 to 10 
for (let i = 1; i <= 10; i++) {
    console.log(i);
  }

//2 2. Print the odd numbers less than 100 

function averageArray(arr) {
    return arr.reduce((acc, num) => acc + num, 0) / arr.length;
  }
  console.log(averageArray([1, 2, 3, 4, 5])); // Test function
//3  Print the multiplication table with 7 
for (let i = 1; i <= 10; i++) {
    console.log(`7 x ${i} = ${7 * i}`);
  }
//4 . Print all the multiplication tables with numbers from 1 to 10 
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      console.log(`${i} x ${j} = ${i * j}`);
    }
  }
//5   Calculate the sum of numbers from 1 to 10 
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log(sum);

//6 6. Calculate 10! 
let factorial = 1;
for (let i = 1; i <= 10; i++) {
  factorial *= i;
}
console.log(factorial);

//7 7. Calculate the sum of even numbers greater than 10 and less than 30 
let evenSum = 0;
for (let i = 12; i < 30; i += 2) {
  evenSum += i;
}
console.log(evenSum);

//8 8. Create a function that will convert from Celsius to Fahrenheit 
function celsiusToFahrenheit(celsius) {
    return celsius * 9/5 + 32;
  }
  console.log(celsiusToFahrenheit(30)); // Test function

  //9. Create a function that will convert from Fahrenheit to Celsius 
  function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
  }
  console.log(fahrenheitToCelsius(86)); // Test function

  //10  Calculate the sum of numbers in an array of numbers 
  function sumArray(arr) {
    return arr.reduce((acc, num) => acc + num, 0);
  }
  console.log(sumArray([1, 2, 3, 4, 5])); // Test function
// 11. Calculate the average of the numbers in an array of numbers 
function averageArray(arr) {
    return arr.reduce((acc, num) => acc + num, 0) / arr.length;
  }
  console.log(averageArray([1, 2, 3, 4, 5])); // Test function

  //12. Create a function that receives an array of numbers as argument and returns an array containing only the positive numbers 
  function positiveNumbers(numbers) {
    return numbers.filter(number => number > 0);
  }

  //13 13. Find the maximum number in an array of numbers
  function maxNumber(numbers) {
    return Math.max(...numbers);
  }
// 14. Print the first 10 Fibonacci numbers without recursion
function printFibonacci() {
    let a = 0, b = 1, next;
    for (let i = 0; i < 10; i++) {
      console.log(a);
      next = a + b;
      a = b;
      b = next;
    }
  }
//15. Create a function that will find the nth Fibonacci number using recursion 
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
//16. Create a function that will return a Boolean specifying if a number is prime 
function isPrime(number) {
    if (number <= 1) return false;
    for (let i = 2; i * i <= number; i++) {
      if (number % i === 0) return false;
    }
    return true;
  }

  //17. Calculate the sum of digits of a positive integer number 
  function sumDigits(number) {
    return number.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  //18. Print the first 100 prime numbers 
  function printFirst100Primes() {
    let count = 0, num = 2;
    while (count < 100) {
      if (isPrime(num)) {
        console.log(num);
        count++;
      }
      num++;
    }
  }

  //19. Create a function that will return in an array the first “p” prime numbers greater than “n” 20. Rotate an array to the left 1 position 
  function primesGreaterThanN(p, n) {
    let primes = [];
    let number = n + 1;
    while (primes.length < p) {
      if (isPrime(number)) primes.push(number);
      number++;
    }
    return primes;
  }

//20  Rotate an array to the left 1 position 
function rotateLeft(arr) {
    const first = arr.shift();
    arr.push(first);
    return arr;
}

//21. Rotate an array to the right 1 position 
function rotateRight(arr) {
    const last = arr.pop();
    arr.unshift(last);
    return arr;
}

//22. Reverse an array 
function reverseArray(arr) {
    return arr.reverse();
}

//23. Reverse a string 
function reverseString(str) {
    return str.split('').reverse().join('');
}

//24. Create a function that will merge two arrays and return the result as a new array 
function mergeArrays(arr1, arr2) {
    return arr1.concat(arr2);
}

//25. Create a function that will receive two arrays of numbers as arguments and return an array composed of all the numbers that are either in the first array or second array but not in both 
function symmetricDifference(arr1, arr2) {
    const diff1 = arr1.filter(x => !arr2.includes(x));
    const diff2 = arr2.filter(x => !arr1.includes(x));
    return diff1.concat(diff2);
}

//26. Create a function that will receive two arrays and will return an array with elements that are in the first array but not in the second
function difference(arr1, arr2) {
    return arr1.filter(x => !arr2.includes(x));
}
