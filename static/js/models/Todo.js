var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: {
    type: String
  },
  order: {
    type: Number
  },
  completed: {
    type: Boolean
  }
});

module.exports = mongoose.model("Todo", todoSchema);
