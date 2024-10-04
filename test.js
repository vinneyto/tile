const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

// let lines = [];
// let isFirst = true;
// rl.on("line", (line) => {
//   if (isFirst) {
//     isFirst = false;
//   } else {
//     lines.push(Number(line));
//   }
// }).on("close", () => {
//   // task 0
//   // const s = lines[0];
//   // const j = lines[1];
//   // console.log(checkCount(s, j));
//   //
//   //
//   // task 1
//   console.log(findLingestBinarySequence(lines));
// });

// function checkCount(s, j) {
//   let specials = new Set(s.split(''));

//   let numSpecial = 0;

//   for (const char of j) {
//     if (specials.has(char)) {
//       numSpecial++;
//     }
//   }

//   return numSpecial;
// }

// function findLingestBinarySequence(data) {
//   let maxSeq = 0;
//   let currentSeq = 0;

//   for (let i = 0; i < data.length; i++) {
//     if (data[i] === 1) {
//       currentSeq++;
//     }

//     if (data[i] === 0 || i === data.length - 1) {
//       if (currentSeq > maxSeq) {
//         maxSeq = currentSeq;
//       }
//       currentSeq = 0;
//     }
//   }

//   return maxSeq;
// }

// function removeDuplicates(arr) {
//   const n = arr.length;
//   if (n <= 1) return n;

//   let idx = 1;
//   for (let i = 1; i < n; i++) {
//     if (arr[i] !== arr[i - 1]) {
//       arr[idx++] = arr[i];
//     }
//   }

//   return idx;
// }

// // let max = -Infinity;
// const data = [];

// let isFirst = true;
// rl.on("line", (line) => {
//   if (isFirst) {
//     isFirst = false;
//     return;
//   }

//   const n = Number(line);
//   data.push(n);

//   // if (n > max) {
//   //   max = n;
//   //   console.log(n);
//   // }
// }).on("close", () => {
//   const newSize = removeDuplicates(data);

//   for (let i = 0; i < newSize; i++) {
//     console.log(data[i]);
//   }
// });

// rl.on("line", (line) => {
//   const count = Number(line);

//   printBraceSeq(0, 0, count, "");
// });

// function printBraceSeq(opened, closed, maxDepth, res) {
//   if (opened === maxDepth && closed === maxDepth) {
//     console.log(res);
//     return;
//   }

//   if (opened < maxDepth) {
//     printBraceSeq(opened + 1, closed, maxDepth, res + "(");
//   }

//   if (closed < opened) {
//     printBraceSeq(opened, closed + 1, maxDepth, res + ")");
//   }
// }

let lines = [];
rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const [str1, str2] = lines;
  console.log(isAnagram(str1, str2) ? 1 : 0);
});

function getCountMap(str) {
  let map = new Map();
  for (const char of str) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
  }
  return map;
}

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  let map1 = getCountMap(str1);
  let map2 = getCountMap(str2);

  for (const [key, value] of map1) {
    if (map2.get(key) !== value) {
      return false;
    }
  }

  return true;
}
