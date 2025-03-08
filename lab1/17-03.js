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

    console.time("INCR");
    for(let i = 1; i <= reqAmount; i++){
        await client.incr(key);
    }
    console.timeEnd("INCR");

    console.time("DECR");
    for(let i = 1; i <= reqAmount; i++){
        await client.decr(key);
    }
    console.timeEnd("DECR");

    await client.quit();
}

timeTest().catch((err) => console.error("Ошибка выполнения:", err));
