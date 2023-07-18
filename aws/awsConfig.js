import { fromIni } from "@aws-sdk/credential-provider-ini";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { credentials } from "./credentials.js";

const credentialProvider = fromIni({
  profile: credentials.profile,
});

const s3 = new S3Client({
  region: "eu-north-1",
  credentialProvider,
});
export default s3;
