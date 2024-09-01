require('dotenv').config();

module.exports =  {
    env: process.env.NODE_ENVIRONMENT,
    host: process.env.HOST_NAME,
    port: process.env.HOST_PORT,
    mongoose: {
        url: process.env.MONGODB_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES
}
