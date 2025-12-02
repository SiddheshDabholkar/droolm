import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS } from "../constant/envs";

const s3 = new S3({
  region: AWS.DEFAULT_REGION,
  credentials: {
    accessKeyId: AWS.ACCESS_KEY_ID,
    secretAccessKey: AWS.SECRET_ACCESS_KEY,
  },
  forcePathStyle: false,
});
const BUCKET_NAME = AWS.BUCKET_NAME;

console.log(AWS);

const awsDownload = async (id: string) => {
  let response = {
    isError: false,
    message: "",
    data: null,
  };

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: id,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });
    response.data = url as any;
    return response;
  } catch (error: unknown) {
    console.error(`Something went wrong in awsDownload due to `, error);
    response.isError = true;
    response.message = "Something went wrong in awsDownload";
    return response;
  }
};

const deleteAwsFile = async (key: string) => {
  let response = {
    isError: false,
    message: "",
    data: null,
  };

  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    };
    const file = await s3.deleteObject(params);
    console.log("file", file);
    response.data = file as any;
    return response;
  } catch (error) {
    console.error("Error deleting file:", error);
    response.isError = true;
    response.message = "Something went wrong while deleting file";
    return response;
  }
};

const getSignedUrlToUpload = async (key: string, name: string) => {
  let response = {
    isError: false,
    message: "",
    data: null,
  };

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: "text/plain",
      Metadata: {
        name,
      },
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });
    response.data = url as any;
    return response;
  } catch (error) {
    console.error("Something went wrong in getSignedUrlPromise due to ", error);
    response.isError = true;
    response.message = "Something went wrong in getSignedUrlToUpload";
    return response;
  }
};

export { awsDownload, deleteAwsFile, getSignedUrlToUpload };
