import qr from "qrcode";
import { update } from "./taskSendInvitation.controller.js";
export const genQRcode = async (req, res) => {
  if (!req.params.id)
    return res.status(500).json({
      error: err,
      success: false,
      code: 500,
    });
  Promise.all([
    sendQRcode(req.params.id, res),
    update(req.params.id, {
      isReceivedEmail: true,
    }),
  ]).catch((err) => {
    return new Error(err);
  });
};

function sendQRcode(id, res) {
  if (!id) return;
  return new Promise(function (resolve, reject) {
    qr.toDataURL(id)
      .then((result) => {
        resolve(result);
        res.status(200);
        res.set("Content-Type", "image/jpeg");
        const data = new Buffer.from(
          result.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        res.send(data);
      })
      .catch((err) => {
        reject(err);
        res.status(500).send({ success: false });
      });
  });
}
