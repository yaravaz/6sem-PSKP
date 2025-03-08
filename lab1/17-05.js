const redis = require('redis');

const sub_client = redis.createClient({ url: "redis://localhost:6379" });


(async () => {

    await sub_client.connect();

    await sub_client.subscribe('channel-01', (message) => {
        console.log("Message from pub_client: "+ message)
    });
})();

setTimeout(async () => {
    await sub_client.unsubscribe('channel-01');
    console.log('Unsubscribed from channel-01');
    await sub_client.quit();
}, 60000);
