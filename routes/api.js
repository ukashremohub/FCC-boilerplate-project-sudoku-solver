'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const CoordinateChecker = require('../controllers/coordinate-check')

module.exports = function (app) {
  let sudokuSolver = new SudokuSolver()
  let coordinateChecker = new CoordinateChecker()
  

  app.route('/api/check')
    .post((req, res) => {
      let puzzleStr = req.body.puzzle
      let coordinateStr = req.body.coordinate
      let value = req.body.value
      let regex1 = /[^1-9]/
      // any missing fields?
      if (!puzzleStr || !coordinateStr || !value) return res.json({error: 'Required field(s) missing'})
      // valid value?
      if (regex1.test(value)) return res.json({error: 'Invalid value'})
      // valid puzzle string?
      if (sudokuSolver.validate(puzzleStr)!==true) return res.json({error: sudokuSolver.validate(puzzleStr)})
      // valid coordinate?
      if(!coordinateChecker.getCellPosition(coordinateStr)) return res.json({error: 'Invalid coordinate'})
      
      let coordinateArr = coordinateChecker.getCellPosition(coordinateStr)
      let conflictArr = []
      // get conflicts
      if(!sudokuSolver.checkRowPlacement(puzzleStr,coordinateArr[0],coordinateArr[1],value)){
        conflictArr.push('row')
      }
      if(!sudokuSolver.checkColPlacement(puzzleStr,coordinateArr[0],coordinateArr[1],value)){
        conflictArr.push('column')
      }
      if(!sudokuSolver.checkRegionPlacement(puzzleStr,coordinateArr[0],coordinateArr[1],value)){
        conflictArr.push('region')
      }
      // any conflict?
      if(conflictArr.length>0) return res.json({valid: false, conflict: conflictArr})
      // no conflict
      res.json({valid: true})

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleStr = req.body.puzzle
      let result = sudokuSolver.solve(puzzleStr)
      // valid
      if (sudokuSolver.validate(result)===true) return res.json({solution: result})
      // invalid puzzle
      res.json({error: result})
    });
};