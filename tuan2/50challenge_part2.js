// 27. Create a function that will receive an array of numbers as argument and will return a new array with distinct elements
const distinctArray = (arr) => [...new Set(arr)];

// 28. Calculate the sum of first 100 prime numbers and return them in an array
const first100PrimesSum = () => {
  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  let primes = [];
  let num = 2;
  while (primes.length < 100) {
    if (isPrime(num)) primes.push(num);
    num++;
  }
  const sum = primes.reduce((sum, prime) => sum + prime, 0);
  return [primes, sum];
};

// 29. Print the distance between the first 100 prime numbers
const primeDistances = () => {
  const [primes] = first100PrimesSum();
  let distances = [];
  for (let i = 1; i < primes.length; i++) {
    distances.push(primes[i] - primes[i - 1]);
  }
  return distances;
};

// 30. Create a function that will add two positive numbers of indefinite size. The numbers are received as strings and the result should be also provided as string.
const addLargeNumbers = (num1, num2) => {
  let result = '';
  let carry = 0;
  let i = num1.length - 1;
  let j = num2.length - 1;

  while (i >= 0 || j >= 0 || carry) {
    const digit1 = i >= 0 ? +num1[i] : 0;
    const digit2 = j >= 0 ? +num2[j] : 0;
    let sum = digit1 + digit2 + carry;
    carry = Math.floor(sum / 10);
    result = (sum % 10) + result;
    i--;
    j--;
  }

  return result;
};

// 31. Create a function that will return the number of words in a text
const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;

// 32. Create a function that will capitalize the first letter of each word in a text
const capitalizeWords = (text) => text.replace(/\b\w/g, (char) => char.toUpperCase());

// 33. Calculate the sum of numbers received in a comma delimited string
const sumCommaDelimited = (str) => str.split(',').reduce((sum, num) => sum + parseFloat(num), 0);

// 34. Create a function that returns an array with words inside a text.
const wordsArray = (text) => text.split(/\s+/).filter(Boolean);

// 35. Create a function to convert a CSV text to a “bi-dimensional” array
const csvToArray = (csv) => csv.split('\n').map(row => row.split(','));

// 36. Create a function that converts a string to an array of characters
const stringToCharArray = (str) => str.split('');

// 37. Create a function that will convert a string in an array containing the ASCII codes of each character
const stringToAsciiArray = (str) => str.split('').map(char => char.charCodeAt(0));

// 38. Create a function that will convert an array containing ASCII codes in a string
const asciiArrayToString = (arr) => arr.map(code => String.fromCharCode(code)).join('');

// 39. Implement the Caesar cypher
const caesarCipher = (str, shift) => {
  return str.replace(/[a-z]/gi, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

// 40. Implement the bubble sort algorithm for an array of numbers
const bubbleSort = (arr) => {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  return arr;
};

// 41. Create a function to calculate the distance between two points defined by their x, y coordinates
const distanceBetweenPoints = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

// 42. Create a function that will return a Boolean value indicating if two circles defined by center coordinates and radius are intersecting
const circlesIntersect = (x1, y1, r1, x2, y2, r2) => {
  const distance = distanceBetweenPoints(x1, y1, x2, y2);
  return distance <= r1 + r2;
};

// 43. Create a function that will receive a bi-dimensional array as argument and a number and will extract as a unidimensional array the column specified by the number
const extractColumn = (arr, col) => arr.map(row => row[col]);

// 44. Create a function that will convert a string containing a binary number into a number
const binaryToNumber = (binaryStr) => parseInt(binaryStr, 2);

// 45. Create a function to calculate the sum of all the numbers in a jagged array (contains numbers or other arrays of numbers on an unlimited number of levels)
const sumJaggedArray = (arr) => {
  return arr.reduce((sum, el) => sum + (Array.isArray(el) ? sumJaggedArray(el) : el), 0);
};

// 46. Find the maximum number in a jagged array of numbers or array of numbers
const maxInJaggedArray = (arr) => {
  return arr.reduce((max, el) => Math.max(max, Array.isArray(el) ? maxInJaggedArray(el) : el), -Infinity);
};

// 47. Deep copy a jagged array with numbers or other arrays in a new array
const deepCopyJaggedArray = (arr) => {
  return arr.map(el => Array.isArray(el) ? deepCopyJaggedArray(el) : el);
};

// 48. Create a function to return the longest word in a string
const longestWord = (str) => {
  const words = str.split(/\s+/).filter(Boolean);
  return words.reduce((longest, word) => word.length > longest.length ? word : longest, '');
};

// 49. Shuffle an array of strings
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// 50. Create a function that will receive n as argument and return an array of n random numbers from 1 to n. The numbers should be unique inside the array.
const uniqueRandomNumbers = (n) => {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  return shuffleArray(arr);
};

// 51. Find the frequency of letters inside a string. Return the result as an array of arrays. Each subarray has 2 elements: letter and number of occurrences.
const letterFrequency = (str) => {
  const freq = {};
  for (const char of str) {
    if (char.match(/[a-z]/i)) {
      freq[char] = (freq[char] || 0) + 1;
    }
  }
  return Object.entries(freq);
};

// 52. Calculate Fibonacci(500) with high precision (all digits)
const fibonacci = (n) => {
  let a = BigInt(0), b = BigInt(1);
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a.toString();
};

// 53. Calculate 70! with high precision (all digits)
const factorial = (n) => {
  let result = BigInt(1);
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }
  return result.toString();
};
