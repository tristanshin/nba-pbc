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
        assert([this.leftParticipant, this.rightParticipant, '?'].includes(winner), 'winner must be a participant or unknown');
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
     * Scores the bracket prediction, removing any previous scoring.
     * 
     * WARNING: terribly mutates this object if results has different shape
     * 
     * @param results results bracket to score against
     * @param scoringFormula scoring formula to assign scores
     * @throws error if this and results have different shapes
     */
    public score(results:BracketResult, scoringFormula:(prediction:Match, actual:Match, depth:number) => number):void {
        this.scoresOnRounds.length = 0; // clear any stored scoring
        // simultaneously traverse prediction and results brackets via bfs
        let predictionRound = [this.bracketHead];
        let resultsRound = [results.bracketHead];
        let depth = 0;
        while (predictionRound.length > 0) {
            const nextPredictionRound:Array<Match> = [];
            const nextResultsRound:Array<Match> = [];
            let scoreOnRound = 0;
            let roundHasScore = false;
            for (let i = 0; i < predictionRound.length; i++) {
                const predictionMatch = predictionRound[i]; assert(predictionMatch !== undefined);
                const resultsMatch = resultsRound[i]; assert(resultsMatch !== undefined);
                if (resultsMatch.winner === '?') {
                    predictionMatch.score = null;
                } else {
                    predictionMatch.score = scoringFormula(predictionMatch, resultsMatch, depth);
                    scoreOnRound += predictionMatch.score;
                    roundHasScore = true;
                }
                if (predictionMatch.left instanceof Match) {
                    nextPredictionRound.push(predictionMatch.left);
                }
                if (predictionMatch.right instanceof Match) {
                    nextPredictionRound.push(predictionMatch.right);
                }
                if (resultsMatch.left instanceof Match) {
                    nextResultsRound.push(resultsMatch.left);
                }
                if (resultsMatch.right instanceof Match) {
                    nextResultsRound.push(resultsMatch.right);
                }
            }
            predictionRound = nextPredictionRound;
            resultsRound = nextResultsRound;
            this.scoresOnRounds.push(roundHasScore ? scoreOnRound : null);
            depth++;
        }
    }

    /**
     * Computes the score of a fixed round.
     * 
     * @param depth depth of the round to compute the score of
     * @returns score on round, or null if the results do not exist for the round yet
     */
    public getScoreOnRound(depth:number):number|null {
        const score = this.scoresOnRounds[depth];
        return (score === undefined) ? null : score;
    }

    /**
     * Computes the score through a fixed round.
     * 
     * @param depth depth of the round to compute the score through
     * @returns score through round, or null if results do not exist for some round
     *          through the requested round yet
     */
    public getScoreThroughRound(depth:number):number|null {
        if (this.scoresOnRounds.length === 0) {
            return null;
        }
        let score = 0;
        for (let i = depth; i < this.scoresOnRounds.length; i++) {
            const scoreOnRound = this.scoresOnRounds[i];
            if ((scoreOnRound === undefined) || (scoreOnRound === null)) {
                return null;
            }
            score += scoreOnRound;
        }
        return score;
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
