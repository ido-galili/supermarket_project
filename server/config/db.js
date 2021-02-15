const mongoose = require("mongoose"),
  dbUrl = "mongodb://localhost/store",
  seedDB = require("../seeds");


mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(success => {
    console.log("Mongoose connect success!");
  })
  .catch(err => console.log(err));

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    console.log("Store DB Connected!")
    // create dummy DB
    // seedDB() 
});

