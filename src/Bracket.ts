import assert from 'assert';

/**
 * ADT representing a score-able match prediction
 */
export class MatchPrediction {

    public score:number|null = null;
    public readonly predictedWinner:string;
    public readonly leftParticipant:string;
    public readonly rightParticipant:string;

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
        public readonly predictedLeftScore:number,
        public readonly predictedRightScore:number
    ) {
        this.leftParticipant = (left instanceof MatchPrediction) ? left.predictedWinner : left;
        this.rightParticipant = (right instanceof MatchPrediction) ? right.predictedWinner : right;
        this.predictedWinner = (predictedLeftScore >= predictedRightScore) ? this.leftParticipant : this.rightParticipant;
    }

}
