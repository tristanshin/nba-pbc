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
