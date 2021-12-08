console.log("[-] Connecting to database...")
const mongoose = require('mongoose');
module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        mongoose.connect(`mongodb+srv://discordbot:HShmotwNgHsJokwJ@clusterzero.ts0ko.mongodb.net/HaumeaDatabase?retryWrites=true&w=majority`, dbOptions)
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        
        mongoose.connection.on('connected', () => {
            console.log("[!] Database connected")   
        });


        mongoose.connection.on('disconnected', () => {
            console.log("[!] Database desconectada.")
        });


        mongoose.connection.on('err', (err) => {
            console.log("[!] Aconteceu um erro!:\n\n" + err)
        });
    }
}