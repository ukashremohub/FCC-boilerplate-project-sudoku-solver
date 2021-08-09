const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver()

suite('UnitTests', () => {
    test('Logic handles a valid puzzle string of 81 characters',()=>{
        assert.equal(
            solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'),
            true
        )
    })
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)',()=>{
        assert.equal(
            solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4p....5.2.......4..8916..85.72...3'),
            "Invalid characters in puzzle"
        )
    })
    test('Logic handles a puzzle string that is not 81 characters in length',()=>{
        assert.equal(
            solver.validate('5..91372.3...8.5.9.9.25..8.68.47.233...95..46.7.4.....5.2.......4..8916..85.72....3'),
            "Expected puzzle to be 81 characters long"
        )
    })
    test('Logic handles a valid row placement',()=>{
        assert.equal(
            solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,1,7),
            true
        )
    })
    test('Logic handles an invalid row placement',()=>{
        assert.equal(
            solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,1,1),
            false
        )
    })
    test('Logic handles a valid column placement',()=>{
        assert.equal(
            solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,1,7),
            true
        )
    })
    test('Logic handles an invalid column placement',()=>{
        assert.equal(
            solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,1,1),
            false
        )
    })
    test('Logic handles a valid region (3x3 grid) placement',()=>{
        assert.equal(
            solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,1,1),
            true
        )
    })
    test('Logic handles an invalid region (3x3 grid) placement',()=>{
        assert.equal(
            solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,1,2),
            false
        )
    })
    test('Valid puzzle strings pass the solver',()=>{
        assert.equal(
            solver.solve('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'),
            '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
        )
    })
    test('Invalid puzzle strings fail the solver',()=>{
        assert.equal(
            solver.solve('......7..............1.......16.......9.....7..........62..5.78.8...3.2.........1'),
            'Puzzle cannot be solved'
        )
    })
    test('Solver returns the the expected solution for an incomplete puzzzle',()=>{
        assert.equal(
            solver.solve('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'),
            '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
        )
    })
});