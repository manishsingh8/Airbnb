const { mongoose } = require("mongoose");

const homeSchema = mongoose.Schema({
  homeName: { type: String, required: true },
  homePrice: { type: Number, required: true },
  homeLocation: { type: String, required: true },
  homeRating: String,
});
// Need to fix later
// homeSchema.pre("findOneAndDelete", async function (next) {
//   console.log("Came to pre hook while deleting a home");
//   const homeId = this.getQuery()._id;
//   await favourite.deleteMany({ homeId });
//   next();
// });

module.exports = mongoose.model("Home", homeSchema);
