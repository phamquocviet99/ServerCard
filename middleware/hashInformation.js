// import CryptoJS from "crypto-js";
// import dotenv from "dotenv";
// dotenv.config();
// const secretKey = process.env.SECRET_KEY_HASH;
// // Hàm mã hóa một đối tượng JSON thành chuỗi mã hóa
// export function encryptJSON(jsonData) {
//   const jsonString = JSON.stringify(jsonData);
//   const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey, {
//     format: CryptoJS.format.Hex,
//   });
//   return encrypted.toString();
// }

// // Hàm giải mã một chuỗi mã hóa thành đối tượng JSON
// export function decryptJSON(encodedData) {
//   const decryptedBytes = CryptoJS.AES.decrypt(encodedData, secretKey, {
//     format: CryptoJS.format.Hex,
//   });
//   const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
//   return decryptedText;
// }
