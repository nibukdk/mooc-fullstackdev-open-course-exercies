const mongoose = require("mongoose");

require("dotenv").config();

// const name = process.argv[3];
// const number = process.argv[4];

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((_) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: [true, "User phone number required"],

    validate: {
      validator: function (v) {
        return /\d{3}-\d{7}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It should be of total 11 length inlcuding (- after first 3 digits.For instance, 123-4567891`,
    },
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
