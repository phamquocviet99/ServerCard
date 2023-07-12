import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: true,
    },
    nameCard: {
      type: String,
      require: true,
    },
    nameUser: {
      type: String,
      require: true,
    },
    nameCompany: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    zalo: {},
    facebook: {},
    location: {
      type: String,
      require: true,
    },
    logo: {
      type: Object,
      require: true,
    },
    preview: {
      type: Object,
      require: true,
    },
    QRcode: {
      type: Object,
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
export default mongoose.model("vCards", schema);
