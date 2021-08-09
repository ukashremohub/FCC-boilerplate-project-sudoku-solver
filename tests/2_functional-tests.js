const chai = require("chai");
const chaiHttp = require('chai-http');
const CoordinateChecker = require("../controllers/coordinate-check");
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve',()=>{
        chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.equal(res.body.solution, '827549163531672894649831527496157382218396475753284916962415738185763249374928651')
            })
    })
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve',()=>{
        chai.request(server)
            .post('/api/solve')
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, "Required field missing")
            })
    })
    test('Solve a puzzle with invalid characters: POST request to /api/solve',()=>{
        chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.........0...53..4...96.415..81..7632..3...28.51'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, "Invalid characters in puzzle")
            })
    })
    test('Solve a puzzle with incorrect length: POST request to /api/solve',()=>{
        chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '123'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
            })
    })
    test('Solve a puzzle that cannot be solved: POST request to /api/solve',()=>{
        chai.request(server)
            .post('/api/solve')
            .send({
                puzzle: '..........................749.157.........1...53..4...96......81........3...28.51'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Puzzle cannot be solved')
            })
    })
    test('Check a puzzle placement with all fields: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: 7
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'valid')
                assert.equal(res.body.valid, true)
            })
    })
    test('Check a puzzle placement with single placement conflict: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '2'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'valid')
                assert.equal(res.body.valid, false)
                assert.property(res.body, 'conflict')
                assert.equal(res.body.conflict.length, 1)
            })
    })
    test('Check a puzzle placement with multiple placement conflict: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '1'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'valid')
                assert.equal(res.body.valid, false)
                assert.property(res.body, 'conflict')
                assert.equal(res.body.conflict.length, 2)
            })
    })
    test('Check a puzzle placement with all placement conflict: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '5'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'valid')
                assert.equal(res.body.valid, false)
                assert.property(res.body, 'conflict')
                assert.equal(res.body.conflict.length, 3)
            })
    })
    test('Check a puzzle placement with missing required fields: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                value: '1'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Required field(s) missing')
            })
    })
    test('Check a puzzle placement with invalid characters: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432..q...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '5'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Invalid characters in puzzle')
            })
    })
    test('Check a puzzle placement with incorrect length: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432.......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '5'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
            })
    })
    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'aa1',
                value: '5'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Invalid coordinate')
            })
    })
    test('Check a puzzle placement with invalid placement value: POST request to /api/check',()=>{
        chai.request(server)
            .post('/api/check')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '('
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                assert.equal(res.body.error, 'Invalid value')
            })
    })
});