import assert from 'assert';
import { Match, BracketPrediction, BracketResult } from '../src/Bracket';

function makeTestBracketPrediction():BracketPrediction {
    const leftSemi = new Match('A', 'B', 'A', 4, 3);
    const rightSemi = new Match('C', 'D', 'C', 4, 2);
    const finals = new Match(leftSemi, rightSemi, 'C', 1, 4);
    return new BracketPrediction(finals);
}

function makeTestBracketResultComplete():BracketResult {
    const leftSemi = new Match('A', 'B', 'A', 4, 0);
    const rightSemi = new Match('C', 'D', 'C', 4, 2);
    const finals = new Match(leftSemi, rightSemi, 'C', 2, 4);
    return new BracketResult(finals);
}

function makeTestBracketResultIncomplete():BracketResult {
    const leftSemi = new Match('A', 'B', 'A', 4, 0);
    const rightSemi = new Match('C', 'D', 'C', 4, 2);
    const finals = new Match(leftSemi, rightSemi, '?', 0, 0);
    return new BracketResult(finals);
}

describe('BracketPrediction', function() {
    /**
     * BracketPrediction testing strategy
     * 
     * score:
     *   partition on this and results: have same shape, have different shapes
     * getScoreOnRound:
     *   partition on depth: 0, >0
     *   partition on this and depth: scores exist for round, scores do not exist for round
     *   partition on this: has been scored already, has not been scored already
     * getScoreThroughRound:
     *   partition on depth: 0, max depth, 0 < depth < max depth
     *   partition on this and depth: scores exist for round, scores do not exist for round
     *   partition on this: has been scored already, has not been scored already
     */

    // covers score with this and results have different shapes
    it('attempt to score with wrong-shaped results', function () {
        const testBracketPrediction = makeTestBracketPrediction();
        const leftSemi = new Match('A', 'B', 'A', 4, 0);
        const finals = new Match(leftSemi, 'C', 'C', 2, 4);
        assert.throws(
            () => {
                testBracketPrediction.score(new BracketPrediction(finals), (prediction, actual, depth) => 0);
            },
            'expected error when scoring with wrong shape'
        );
    });

    // covers score with this and results have same shape
    // covers getScoreOnRound with depth 0, scores do not exist for round
    // covers getScoreThroughRound with depth 0, scores do not exist for round
    it('attempt to get score with round not scored', function () {
        const testBracketPrediction = makeTestBracketPrediction();
        const testBracketResult = makeTestBracketResultIncomplete();
        const depth = 0;
        testBracketPrediction.score(testBracketResult, (prediction, actual, depth) => (prediction.leftScore + actual.rightScore + depth));
        assert(testBracketPrediction.getScoreOnRound(depth) === null);
        assert(testBracketPrediction.getScoreThroughRound(depth) === null);
    });

    // covers getScoreOnRound with this has not been scored already
    // covers getScoreThroughRound with this has not been scored already
    it('attempt to get score with prediction not scored', function () {
        const testBracketPrediction = makeTestBracketPrediction();
        const depth = 1;
        assert(testBracketPrediction.getScoreOnRound(depth) === null);
        assert(testBracketPrediction.getScoreThroughRound(depth) === null);
    });

    // covers getScoreOnRound with depth >0, scores exist for round, this has been scored already
    // covers getScoreThroughRound with max depth, scores exist for round, this has been scored already
    it('get score from incomplete result', function () {
        const testBracketPrediction = makeTestBracketPrediction();
        const testBracketResult = makeTestBracketResultIncomplete();
        const depth = 1;
        testBracketPrediction.score(testBracketResult, (prediction, actual, depth) => (prediction.leftScore + actual.rightScore + depth));
        assert(testBracketPrediction.getScoreOnRound(depth) === 5 + 7);
        assert(testBracketPrediction.getScoreThroughRound(depth) === 5 + 7);
    });

    // covers getScoreThroughRound with 0 < depth < max depth
    it('get cumulative score for intermediate round', function () {
        const quarter1 = new Match('A', 'B', 'A', 4, 3);
        const quarter2 = new Match('C', 'D', 'C', 4, 2);
        const quarter3 = new Match('E', 'F', 'F', 0, 4);
        const quarter4 = new Match('G', 'H', 'H', 1, 4);
        const semi1 = new Match(quarter1, quarter2, 'C', 1, 4);
        const semi2 = new Match(quarter3, quarter4, 'F', 4, 0);
        const finals = new Match(semi1, semi2, 'F', 4, 0);
        const testBracketPrediction = new BracketPrediction(finals);
        const quarter1Result = new Match('A', 'B', 'A', 4, 0);
        const quarter2Result = new Match('C', 'D', 'C', 4, 2);
        const quarter3Result = new Match('E', 'F', 'E', 4, 0);
        const quarter4Result = new Match('G', 'H', 'H', 3, 4);
        const semi1Result = new Match(quarter1Result, quarter2Result, 'C', 2, 4);
        const semi2Result = new Match(quarter3Result, quarter4Result, 'E', 4, 2);
        const finalsResult = new Match(semi1Result, semi2Result, 'C', 4, 1);
        const testBracketResult = new BracketResult(finalsResult);
        const depth = 1;
        testBracketPrediction.score(testBracketResult, (prediction, actual, depth) => (prediction.leftScore + actual.rightScore + depth));
        assert(testBracketPrediction.getScoreOnRound(depth) === 6 + 7);
        assert(testBracketPrediction.getScoreThroughRound(depth) === 6 + 8 + 2 + 7 + 6 + 7);
    });
});
