import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    unit: {
      type: String,
      require: true,
    },
    unitAddress: {
      type: String,
    },
    role: {
      type: String,
      require: true,
    },
    pack: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
export default mongoose.model("sponsors", schema);
