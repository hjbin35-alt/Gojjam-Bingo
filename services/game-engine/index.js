// Game Engine Utilities

function generateNumber(called) {
  let number
  
  do {
    number = Math.floor(Math.random() * 75) + 1
  } while (called.includes(number))
  
  return number
}

function autoMark(card, number) {
  return card.map(row =>
    row.map(cell =>
      cell === number
        ? { value: cell, marked: true }
        : cell
    )
  )
}

function verifyBingo(card, calledNumbers) {
  return card.every(row =>
    row.every(cell =>
      calledNumbers.includes(cell.value)
    )
  )
}

function getNumberColumn(number) {
  if (number >= 1 && number <= 15) return 'B'
  if (number >= 16 && number <= 30) return 'I'
  if (number >= 31 && number <= 45) return 'N'
  if (number >= 46 && number <= 60) return 'G'
  if (number >= 61 && number <= 75) return 'O'
  return null
}

module.exports = {
  generateNumber,
  autoMark,
  verifyBingo,
  getNumberColumn
}
