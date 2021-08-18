import Search from './lib/search.js';
export default class CrimsonRedSearch {
    constructor(client) {
        this.client = client;
    }
    search(index) {
        let s = (new Search(this, index));
        return s;
    }
    performRawAggregate(commands) {
        return new Promise((resolve, reject) => {
            this.client.send_command('FT.AGGREGATE', commands, function (err, keys) {
                if (err || typeof (keys) == 'undefined' || !keys) {
                    console.log(err);
                    reject();
                    return;
                }
                var nItems = keys[0];
                var retVal;
                for (var k = 1; k < keys.length; k += 1) {
                    var hash = {};
                    for (var h = 0; h < keys[k].length; h += 2) {
                        var key = keys[k][h];
                        var val = keys[k][h + 1];
                        //console.log(key+':'+val);
                        hash[key] = val;
                    }
                    retVal.push(hash);
                }
                resolve(retVal);
            });
        });
    }
    performRawSearch(commands, options = []) {
        return new Promise((resolve, reject) => {
            this.client.send_command('FT.SEARCH', commands, (err, res) => {
                if (err || !res) {
                    console.log(err);
                    reject();
                    return;
                }
                const nItems = res[0];
                console.log(`Result set n: ${nItems}`);
                const add = 0 + (options.includes('WITHSCORES') ? 1 : 0);
                const width = 2 + add - (options.includes('NOCONTENT') ? 1 : 0);
                const firstValueIndex = 1 + add;
                const startAt = 1;
                const retVal = {};
                for (var k = startAt; k < res.length; k += width) {
                    var hashKey = res[k];
                    const hash = {};
                    if (!options.includes('NOCONTENT')) {
                        const hashContents = res[firstValueIndex + k];
                        for (var h = 0; h < hashContents.length; h += 2) {
                            var key = hashContents[h];
                            var val = hashContents[h + 1];
                            hash[key] = val;
                        }
                    }
                    if (options.includes('WITHSCORES')) {
                        hash['_SCORE_'] = res[k + 1];
                    }
                    retVal[hashKey] = hash;
                }
                resolve(retVal);
            });
        });
    }
}
