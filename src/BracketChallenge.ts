import assert from 'assert';
import { Match, BracketPrediction, BracketResult } from './Bracket';

/**
 * ADT representing a submission to a bracket challenge
 */
export class PredictionSubmission {

    private readonly bonusSubmissions:Array<string>;

    /**
     * Constructs a submission to a bracket challenge.
     * 
     * @param name submission name
     * @param bracket prediction for the bracket
     * @param bonusSubmissions prediction for bonuses
     */
    public constructor(
        public readonly name:string,
        public readonly bracket:BracketPrediction,
        bonusSubmissions:Array<string>
    ) {
        this.bonusSubmissions = [...bonusSubmissions];
    }

}

/**
 * ADT representing a bracket challenge pool
 */
export class BracketChallenge {

    /**
     * Constructs a bracket challenge.
     * 
     * @param bracketResults results for the bracket
     * @param bracketScoringFormula scoring formula for the bracket
     * @param bonusScoringFormula scoring formula for the bonuses
     */
    public constructor(
        private readonly bracketResults:BracketResult,
        private readonly bracketScoringFormula:(prediction:Match, actual:Match, depth:number) => number,
        private readonly bonusScoringFormula:(predictions:Array<Array<string>>) => Array<Array<number>>
    ) {
    }

    /**
     * Adds a submission to the bracket challenge.
     * 
     * @param submission submission to add
     */
    public addSubmission(submission:PredictionSubmission):void {
        throw Error('implement me!');
    }

    /**
     * Scores all brackets in submissions.
     */
    public scoreBrackets():void {
        throw Error('implement me!');
    }

    /**
     * Scores all bonuses in submissions.
     */
    public scoreBonuses():void {
        throw Error('implement me!');
    }

    /**
     * Computes results for a round and outputs the results in a file.
     * 
     * @param outputFilePath file path of desired output
     * @param depth depth of round to get results for
     */
    public getResultsForRound(depth:number, outputFilePath:string):void {
        throw Error('implement me!');
    }

    // TODO operations to compute statistics

}
