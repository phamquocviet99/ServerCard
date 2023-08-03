import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    zalo: {
      type: String,
      require: true,
    },
    isSentEmail: {
      type: Boolean,
      default: false,
    },
    isSentZalo: {
      type: Boolean,
      require: true,
      default: false,
    },
    isReceivedEmail: {
      type: Boolean,
      default: false,
    },
    isReceivedZalo: {
      type: Boolean,
      require: true,
      default: false,
    },
    isError: [],
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
export default mongoose.model("taskSendInvitations", schema);
