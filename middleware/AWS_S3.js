// import { S3Client } from "@aws-sdk/client-s3";
import AWS3 from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import fs from "fs";
dotenv.config();

const bucketName = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const endpoint = process.env.AWS_ENDPOINT;

const s3Client = new AWS3.S3Client({
  forcePathStyle: true,
  region: process.env.AWS_REGION,
  endpoint: endpoint,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
export default s3Client;
export async function uploadS3(folder, name, file) {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${folder}/${name}`, // pass key
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };
    const command = new AWS3.PutObjectCommand(params);
    const result = await s3Client.send(command);
    if (result.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        url: endpoint + "/" + bucketName + "/" + folder + "/" + name,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }

  //   return await s3.upload({ pa });
}
export async function deleteS3(folder, name) {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${folder}/${name}`, // pass key
    };
    const command = new AWS3.DeleteObjectCommand(params);
    const result = await s3Client.send(command);
    if (result.$metadata.httpStatusCode === 204) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }

  //   return await s3.upload({ pa });
}
