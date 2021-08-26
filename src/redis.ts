import redis from "redis";

const client : any = redis.createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10)
});

client.on('connect', () => {
    console.log('Redis connected!');
});

client.on('error', (err: any) => {
    console.log('Redis error ' + err);
});

export { client } ;