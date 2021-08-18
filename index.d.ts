import Search from './lib/search.js';
export default class CrimsonRedSearch {
    client: any;
    constructor(client: any);
    search(index: string): Search;
    performRawAggregate(commands: any): Promise<Array<any>>;
    performRawSearch(commands: string[], options?: string[]): Promise<unknown>;
}
