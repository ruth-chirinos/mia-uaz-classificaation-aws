import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-2"
const bucketName = "uaz-unir-bucket"
const accessKeyId = "AKIAUORZECBIINF3VZOT";//process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = "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"; //process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60  //seconds
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  console.log(uploadURL);
  return uploadURL
}