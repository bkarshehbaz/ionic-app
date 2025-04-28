export interface IElasticLunrItemResult {
    // {ref: docRef, score: queryResults[docRef]}
    ref: string&number;
    score: number;
}

export interface IElasticLunrResultSet {
    result: IElasticLunrItemResult[];
    type: string;
    term?: string;
}
