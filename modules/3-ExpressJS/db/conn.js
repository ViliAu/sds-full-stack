const { MongoClient } = require("mongodb");
const connStr = 'mongodb://localhost:27017/testdb'
const client = new MongoClient(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection = null;

module.exports = {
    connectToServer: () => {
        client.connect(function (err, db) {
            if (err || !db) {
                console.log("Failed to connect to db");
                return;
            }
            dbConnection = db.db("module3db");
            console.log("Successfully connected to MongoDB.");
        });
    },

    getDb: () => {
        if (!dbConnection) {
            this.connectToServer();
        }
        return dbConnection;
    },
};