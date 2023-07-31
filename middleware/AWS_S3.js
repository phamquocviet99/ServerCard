// import { S3Client } from "@aws-sdk/client-s3";
import AWS3 from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

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
export async function uploadS3(bucket, folder, name, file) {
  try {
    const params = {
      Bucket: bucket,
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
        url: endpoint + "/" + bucket + "/" + folder + "/" + name,
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
}
export async function uploadS3Base64(bucket, folder, name, codeBase64) {
  try {
  
    const base64Data = new Buffer.from(
      codeBase64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = codeBase64.split(";")[0].split("/")[1];
    const params = {
      Bucket: bucket,
      Key: `${folder}/${name}`, // pass key

      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64', // required
      ContentType: `image/${type}` // required. Notice the back ticks
    };
    const command = new AWS3.PutObjectCommand(params);
    const result = await s3Client.send(command);
    if (result.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        url: endpoint + "/" + bucket + "/" + folder + "/" + name,
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
}
export async function deleteS3(bucket, folder, name) {
  try {
    const params = {
      Bucket: bucket,
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
}
export async function getUrl(folder, name) {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${folder}/${name}`, // pass key
    };
    const command = new AWS3.GetObjectCommand(params);
    const result = await s3Client.send(command);
    if (result.$metadata.httpStatusCode === 200) {
      const str = await result.Body.transformToByteArray();
      return {
        success: true,
        data: str,
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
}
