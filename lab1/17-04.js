const redis = require("redis");

const client = redis.createClient({url: "redis://localhost:6379"});

client.on("error", (err) => {
    console.log(err);
} )

const timeTest = async () => {
    await client.connect();

    const reqAmount = 10000;
    const key = 'incr';

    client.set(key, 0);

    console.time("HSET");
    for(let i = 1; i <= reqAmount; i++){
        await client.hSet(`${i}`, 'id', i, 'val', `val-${i}`);
    }
    console.timeEnd("HSET");

    console.time("HGET");
    for(let i = 1; i <= reqAmount; i++){
        await client.hGet(`${i}`, 'val');
    }
    console.timeEnd("HGET");

    await client.quit();
}

timeTest().catch((err) => console.error("Ошибка выполнения:", err));
