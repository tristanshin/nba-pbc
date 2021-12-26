import assert from 'assert';

/**
 * ADT representing a score-able match
 */
export class Match {

    public score:number|null = null;
    public readonly leftParticipant:string;
    public readonly rightParticipant:string;

    /**
     * Constructs a score-able match.
     * 
     * @param left the left entry of the match, which itself is a match prediction or a participant
     * @param right the right entry of the match
     * @param winner the winner of the match; must be the left participant, right participant, or '?'
     * @param leftScore the score of the left participant
     * @param rightScore the score of the right participant
     */
    public constructor(
        public readonly left:Match|string,
        public readonly right:Match|string,
        public readonly winner:string,
        public readonly leftScore:number,
        public readonly rightScore:number
    ) {
        this.leftParticipant = (left instanceof Match) ? left.winner : left;
        this.rightParticipant = (right instanceof Match) ? right.winner : right;
    }

}

/**
 * ADT representing a bracket prediction
 */
export class BracketPrediction {

    private scoresOnRounds:Array<number|null> = [];

    /**
     * Constructs a score-able bracket prediction.
     * 
     * @param bracketHead match corresponding to the finals of the bracket
     */
    public constructor(
        public readonly bracketHead:Match
    ) {
    }

    /**
     * Scores the bracket prediction.
     * 
     * @param results results bracket to score against
     * @param scoringFormula scoring formula to assign scores
     * @throws error if this and results have different shapes
     */
    public score(results:BracketResult, scoringFormula:(prediction:Match, actual:Match, depth:number) => number):void {
        throw Error('implement me!');
    }

    /**
     * Computes the score of a fixed round.
     * 
     * @param depth depth of the round to compute the score of
     * @returns score on round, or null if the results do not exist for the round yet
     */
    public getScoreOnRound(depth:number):number|null {
        throw Error('implement me!');
    }

    /**
     * Computes the score through a fixed round.
     * 
     * @param depth depth of the round to compute the score through
     * @returns score through round, or null if results do not exist for the round yet
     */
    public getScoreThroughRound(depth:number):number|null {
        throw Error('implement me!');
    }
}

/**
 * ADT representing a (possibly incomplete) bracket result
 */
export class BracketResult {

    /**
     * Constructs a (possibly incomplete) bracket result.
     * 
     * @param bracketHead match corresponding to the finals of the bracket
     */
    public constructor(
        public readonly bracketHead:Match
    ) {
    }

}
