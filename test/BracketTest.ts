import assert from 'assert';
import { MatchPrediction } from '../src/Bracket';

describe('MatchPrediction', function () {
    /**
     * MatchPrediction testing strategy
     * 
     * assignScore:
     *   partition on score: is a number
     */

    it('tests scoring of match prediction', function () {
        const testMatchPrediction = new MatchPrediction('test team 1', 'test team 2', {leftScore:0, rightScore:0});
        const testScore = 2.3;
        testMatchPrediction.assignScore(testScore);
        assert.strictEqual(testMatchPrediction.score, testScore, 'expected correct score after assigning');
    });
});
