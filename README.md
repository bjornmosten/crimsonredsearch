# crimsonredsearch
crimsonredsearch for Node.js is a Redisearch wrapper. Works with the most popular redis libraries.

# Example
```
import cr from 'crimsonredsearch';
import cfg from 'config.js';
const dbClient = Redis.createClient({
			host: cfg.redisHost,
			port: cfg.redisPort,
			password: cfg.redisPassword,
		});
const cr = new cr(dbClient);
const s = cr.search('articles');
s
  .query(q)
  .limit(0, 100)
  .sortBy('time','DESC')
  .scorer('BM25')
  .options(['VERBATIM']);
let res = await s.go();

```
