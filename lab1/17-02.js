const redis = require("redis");

const client = redis.createClient({url: "redis://localhost:6379"});

client.on("error", (err) => {
    console.log(err);
} )

const timeTest = async () => {
    await client.connect();

    const reqAmount = 10000;
    const keyPref = 'set';

    console.time("SET");
    for(let i = 1; i <= reqAmount; i++){
        await client.set(`${i}`, `${keyPref}${i}`);
    }
    console.timeEnd("SET");

    console.time("GET");
    for(let i = 1; i <= reqAmount; i++){
        await client.get(`${i}`);
    }
    console.timeEnd("GET");

    console.time("DEL");
    for(let i = 1; i <= reqAmount; i++){
        await client.del(`${i}`);
    }
    console.timeEnd("DEL");

    await client.quit();
}

timeTest().catch((err) => console.error("Ошибка выполнения:", err));
