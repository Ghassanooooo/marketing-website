var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    name: String,
    locations: [{ type: Schema.ObjectId, ref: "Location" }],
    email: String,
    body: String,
    updatedAt: {
      type: Date,
      default: Date.now 
    },
    createdAt: {
      type: Date,
      default: Date.now 
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
