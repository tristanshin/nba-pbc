import assert from 'assert';

/**
 * ADT representing a score-able match prediction
 */
export class MatchPrediction {

    public score:number|null = null;
    public readonly predictedWinner:string;

    /**
     * Constructs a score-able match prediction.
     * 
     * @param left the left entry of the match, which itself is a match prediction or a participant
     * @param right the right entry of the match
     * @param predictedResult the predicted result of the match
     */
    public constructor(
        public readonly left:MatchPrediction|string,
        public readonly right:MatchPrediction|string,
        public readonly predictedResult:{ leftScore:number, rightScore:number }
    ) {
        throw Error('implement me!');
    }

    /**
     * Assigns a prediction score to the match.
     * 
     * @param score numerical score to assign to the match
     */
    public assignScore(score:number) {
        throw Error('implement me!');
    }

}
