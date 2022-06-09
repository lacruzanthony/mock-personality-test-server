var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

before(done => {
  mockgoose.prepareStorage().then(function() {
    mongoose.connect(process.env.MONGO_URL, (err: any) => {
      done(err);
    });
  });
});