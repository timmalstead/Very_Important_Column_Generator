const mongoose = require("mongoose")
const connection = process.env.MONGODB_URI

mongoose.connect(connection, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
})

mongoose.connection.on(`connected`, () => {
    console.log(`mongoose connected on ${connection}`)
})

mongoose.connection.on(`disconnected`, () => {
    console.log(`mongoose has disconnected`)
    mongoose.disconnect
})

mongoose.connection.on(`error`, (err) => {
    console.log(`mongoose has logged the following error: ${err}`)
    mongoose.disconnect
})