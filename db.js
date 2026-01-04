const mongoose = require("mongoose")

async function connectToMongoDb(){
    return mongoose.connect(process.env.DBURL)
}

module.exports = {
    connectToMongoDb,
}