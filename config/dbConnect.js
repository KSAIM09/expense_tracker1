const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGOURL}expensetrackerdata`);

const conn = mongoose.connection;

conn.on("open", () => {
    console.log("Connected to MongoDB");
})

conn.on('error', (err) => {
    console.log("Error >>>>>>>>> connecting to MongoDB", err);
});

module.exports = conn;