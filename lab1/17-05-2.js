const redis = require('redis');

const pub_client = redis.createClient({ url: "redis://localhost:6379" });

(async () => {
  
    await pub_client.connect();
  
    await pub_client.publish('channel-01', 'from pub_client message 1');

    setTimeout(() => {
        pub_client.publish('channel-01', 'from pub_client message 2');
        console.log('delay message is sended');
    }, 3000);
        
})();

setTimeout(async () => {
    await pub_client.quit();
    console.log('Publisher client closed');
}, 60000);
