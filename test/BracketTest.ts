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
     *   partition on depth: 0, >0
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
    it('attempt to score with round not scored', function () {
        const testBracketPrediction = makeTestBracketPrediction();
        const testBracketResult = makeTestBracketResultIncomplete();
        const depth = 0;
        testBracketPrediction.score(testBracketResult, (prediction, actual, depth) => (prediction.leftScore + actual.rightScore + depth));
        assert(testBracketPrediction.getScoreOnRound(depth) === null);
        assert(testBracketPrediction.getScoreThroughRound(depth) === null);
    });
});
