function SudokuSolver() {

  this.validate = function(puzzleString) { // RETURNS TRUE OR ERROR MSG
    let regex = /[^1-9.]/
    if (!puzzleString) return "Required field missing"
    if (regex.test(puzzleString)) return "Invalid characters in puzzle"
    if (puzzleString.length !== 81) return "Expected puzzle to be 81 characters long" 
    return true
  }

  this.checkRowPlacement = function(puzzleString, row, column, value) { // RETURNS BOOLEAN: FALSE IF INVALID
    let result = true
    let rowIndex = row - 1
    let columnIndex = column - 1
    value = value.toString()

    let board = []

    // initiate one dimensional row board
    for (let i = 0; i < 9; i++) {
      let stringIndex = i + rowIndex * 9
      let boardRow = puzzleString[stringIndex]
      board.push(boardRow)
    }

    // board example = A1-A9

    // check each cell in row
    let index = 0
    board.forEach(element => {
      if (index !== columnIndex && value === element) {
        result = false
      }
      index++
    });

    return result
  }

  this.checkColPlacement = function(puzzleString, row, column, value) { // RETURNS BOOLEAN: FALSE IF INVALID
    let result = true
    let rowIndex = row - 1
    let columnIndex = column - 1
    value = value.toString()

    let board = []

    // initiate one dimensional column board
    for (let i = 0; i < 9; i++) {
      let stringIndex = columnIndex + i * 9
      let boardColumn = puzzleString[stringIndex]
      board.push(boardColumn)
    }

    // board example = A1 - I1

    // check each cell in column
    let index = 0
    board.forEach(element => {
      if (index !== rowIndex && value === element) {
        result = false
      }
      index++
    });

    return result
  }

  this.checkRegionPlacement = function(puzzleString, row, column, value) { // RETURNS BOOLEAN: FALSE IF INVALID
    let result = true
    let rowIndex = row - 1
    let columnIndex = column - 1
    value = value.toString()


    // get horizontal group (H1 H2 H3)
    let hGroup = Math.floor(columnIndex / 3)

    // get vertical group (V1 V2 V3)
    let vGroup = Math.floor(rowIndex / 3)


    // iterates over each cell
    for (let i = 0; i < 81; i++) {

      // get row and column
      let cellRow = Math.floor(i / 9)
      let cellColumn = i % 9

      // check for same vGroup and hGroup
      if (Math.floor(cellColumn / 3) === hGroup && Math.floor(cellRow / 3) === vGroup) {
        // ignore own cell
        if (cellRow !== rowIndex || cellColumn !== columnIndex) {
          // when value already taken
          if (puzzleString[i] === value) {
            result = false
          }
        }
      }


    }

    return result
  }

  this.solve = function(puzzleString) { // RETURN STRING or ERROR MSG
    if (this.validate(puzzleString) !== true) return this.validate(puzzleString)

    let board = []
    let boardString = [...puzzleString]
    let reGex = /[.]/

    // STOP RECURSION here (puzzle solved)
    if (!reGex.test(boardString)) {
      let regex = [/[1]/g,/[2]/g,/[3]/g,/[4]/g,/[5]/g,/[6]/g,/[7]/g,/[8]/g,/[9]/g]
      for (let i = 0; i<9; i++){
        let inspectRow = puzzleString.slice(i*9,(i+1)*9).split('')
        let numberRow = inspectRow.map((num)=>parseInt(num))
        let sortedRow = numberRow.sort((a,b)=>a-b)
        for (let i = 0; i<9; i++){
          if(sortedRow[i]!==i+1){
            return 'Puzzle cannot be solved'
          }
        }
      }
      return puzzleString
    }


    // initiate two dimensional board
    for (let i = 0; i < 9; i++) {
      let boardRow = boardString.splice(0, 9)
      board.push(boardRow)
    }

    // for converting
    function boardToString(board) {
      let newString = ''
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          newString = newString + (board[i][j])
        }
      }
      return newString
    }

    // inspect each cell
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        // If no value assigned (.), inspect possibilities
        if (board[i - 1][j - 1] === '.') {
          let possibilities = []
          for (let k = 1; k <= 9; k++) {
            if (this.checkColPlacement(puzzleString, i, j, k) && this.checkRowPlacement(puzzleString, i, j, k) && this.checkRegionPlacement(puzzleString, i, j, k)) {
              possibilities.push(k)
            }
          }
          // when only one solution available
          if (possibilities.length === 1) {
            board[i - 1][j - 1] = possibilities[0].toString()
          }
        }
      }
    }


    let stringSolved = boardToString(board)
    // Stop recursion here (puzzle can't be solved)
    if (stringSolved === puzzleString) {
      return 'Puzzle cannot be solved'

    }

    return this.solve(stringSolved)

  }

}

module.exports = SudokuSolver;