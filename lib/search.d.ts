export default class Search {
    private _index;
    private _query;
    private _options;
    private _sortBy;
    private _limit;
    private _filter;
    private _geoFilter;
    private _inKeys;
    private _inFields;
    private _slop;
    private _highlight;
    private _return;
    private _scorer;
    client: any;
    constructor(client: any, index: string);
    query(q: string): this;
    sortBy(field: string, direction: string): this;
    return(fields: string[]): this;
    scorer(scorerName: string): this;
    limit(begin: number, count: number): this;
    numFilter(numField: string, min: string | number, max: string | number): this;
    geoFilter(geoField: string, lon: string | number, lat: string | number, radius: string | number, unit: string): this;
    slop(slop: number | string): this;
    inKeys(keys: string[]): this;
    inFields(fields: string[]): this;
    options(opts: string[]): this;
    go(): Promise<any>;
}
