const redis = require("redis");

const client = redis.createClient({url: 'redis://localhost:6379'});

client.on("ready", () => {console.log("ready")});
client.on("error", (err) => {console.log("error" + err)});
client.on("connect", () => {console.log("connect")});
client.on("end", () => {console.log("end")});

client.connect();
client.set('key', 'value');
client.quit();


// (async () => {
//     await client.connect();

//     await client.set('key', 'value');
//     const value = await client.get('key');
//     console.log(value);

//     await client.quit();
// })();
