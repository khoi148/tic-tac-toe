export function checkGameIsOver(array) {
  for (let j = 0; j < 9; j += 3) {
    //horizontal check
    if (array[j] === "") continue;
    //cross checks
    if (j === 0) {
      if (array[j] === array[4] && array[4] === array[8]) return true;
    }

    if (array[j] === array[j + 1] && array[j + 1] === array[j + 2]) {
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    //vertical check
    if (array[i] === "") continue;
    //cross checks
    if (i === 2) {
      if (array[i] === array[4] && array[4] === array[6]) return true;
    }
    if (array[i] === array[i + 3] && array[i + 3] === array[i + 6]) {
      return true;
    }
  }
  //tie check
  if (array.every(item => item !== "")) return null;
  return false;
}
