var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  id: Number, //1
  district: String, //Summit
  type: String, //Checkpoint
  title: String, //Welcome
  text: String, //Welcome to Haleakalā National Park!
  text_source: String, //Mack, Jim, and Van Camp Mary L. Haleakala. Las Vegas: KC Publications, 1992. Print.
  photo: String, //Photo binary
  photo_source: String, //Photo author
  coordinates: {
    latitude: Number,
    longitude: Number
  }
});

var parkSchema = new Schema({
  username: String, //test
  password: String, //1234
  name: String, //Haleakala National Park
  location: String, //Kula, HI
  coordinates: {
    latitude: Number, //20.720284, 
    longitude: Number //-156.155175
  },
  posts: [postSchema]
});

var Post = mongoose.model('Post',postSchema);
var Park = mongoose.model('Park',parkSchema);

module.exports.Park = Park;
module.exports.Post = Post;
