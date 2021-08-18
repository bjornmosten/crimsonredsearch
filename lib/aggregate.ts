
import {VALID_OPTIONS, VALID_SCORERS} from './constants';

export default class Aggregate {
	private _index: string;
	private _query: string[];
	private _options: string[];
	private _sortBy: string[];
	private _limit: string[];
	private _filter: string[];
	private _geoFilter: string[];
	private _inKeys: string[];
	private _inFields: string[];
	private _slop: string[];
	private _highlight: string[];
	private _return: string[];
	private _scorer: string[];
	client: any;
	constructor(client, index: string) {
		this.client = client;
		this._query = [];
		this._limit = [];
		this._sortBy = [];
		this._options = [];
		this._scorer = [];
		this._index = index;
	}
	query(q: string) {
		this._query = [q];
		return this;
	}
	sortBy(field: string, direction: string) {
		direction = direction.toUpperCase();
		if(direction != 'DESC' && direction != 'ASC') {
			throw 'Direction must be DESC or ASC';
		}
		this._sortBy = ['SORTBY', field, direction]
		return this;
	}
	return(fields: string[]) {
		this._return = fields;
		return this;
	}

	scorer(scorerName: string) {
		scorerName = scorerName.toUpperCase();
		if(!VALID_SCORERS.includes(scorerName)) {
			throw `${scorerName} is not the name of a valid RediSearch scorer function.`;
		}
		this._scorer = ['SCORER', scorerName];
		return this;
	}
	limit(begin: number, count: number) {
		this._limit = ['LIMIT', begin.toString(), count.toString()];
		return this;
	}
	filter(numField: string, min: string|number, max: string|number) {
		if(typeof min === 'number') min = min.toString();
		if(typeof max === 'number') max = max.toString();
		this._filter = ['FILTER', min, max];
	}
	geoFilter(geoField: string, lon: string|number, lat: string|number, radius: string|number, unit: string) {
		if(typeof lon === 'number') lon = lon.toString();
		if(typeof lat === 'number') lat = lat.toString();
		if(typeof radius === 'number') radius = radius.toString();
		if(!['m','km','mi','ft'].includes(unit)) {
			throw `'${unit}' is not a valid unit.`;
		}
		this._geoFilter = ['FILTER', lon, lat];
	}
	slop(slop: number|string) {
		if(typeof slop == 'number') slop = slop.toString();
		this._slop = ['SLOP', slop];
	}
	inKeys(keys: string[]) {
		this._inKeys = [keys.length.toString()].concat(keys);
	}
	inFields(fields: string[]) {
		this._inFields = [fields.length.toString()].concat(fields);
	}

	options(opts: string[]) {
		for(let i in opts) {
			if(!VALID_OPTIONS.includes(opts[i].toUpperCase())) {
				throw `${opts[i]} is not a valid option.`;
			}
			opts[i] = opts[i].toUpperCase();
		}
		this._options = opts;
		return this;
	}
	async go()  {
		let commands = [this._index]
			.concat(this._query)
			.concat(this._options)
			.concat(this._scorer)
			.concat(this._sortBy)
			.concat(this._limit);
		let res = await this.client.performRawSearch(commands);
		return res;
	}

}
