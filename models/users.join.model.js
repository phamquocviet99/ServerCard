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
    address: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    companyName: {
      type: String,
    },
    gender: {
      type: String,
      require: true,
      default: "male",
    },
    position: {
      type: String,
      // require: true,
    },
    isBanking: {
      type: Boolean,
      require: true,
      default: false,
    },
    urlQR: {
      type: String,
      require: true,
    },
    urlAvatar: {
      type: String,
      require: true,
      default:
        "https://s3-north1.viettelidc.com.vn/fmp-vcard-dev/v-card/XtR-_yZq31xmDnpYOm7DZ/v-card.jpeg",
    },
    isCheckIn: {
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
export default mongoose.model("usersEvent", schema);
