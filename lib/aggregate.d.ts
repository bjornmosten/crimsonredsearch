export default class Aggregate {
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
    filter(numField: string, min: string | number, max: string | number): void;
    geoFilter(geoField: string, lon: string | number, lat: string | number, radius: string | number, unit: string): void;
    slop(slop: number | string): void;
    inKeys(keys: string[]): void;
    inFields(fields: string[]): void;
    options(opts: string[]): this;
    go(): Promise<any>;
}
