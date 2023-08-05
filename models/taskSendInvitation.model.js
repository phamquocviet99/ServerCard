import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    uid: {
      type: String,
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
    errorZalo: {
      type: String,
    },
    isErrorEmail: {
      type: Boolean,
      require: true,
      default: false,
    },
    isErrorZalo: {
      type: Boolean,
      require: true,
      default: false,
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
export default mongoose.model("taskSendInvitations", schema);
