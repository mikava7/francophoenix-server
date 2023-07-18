import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";

export const fetchAudioFiles = async (req, res) => {
  const s3 = new S3Client({
    region: "eu-north-1",
    credentials: fromIni({
      profile: "Mikava365",
    }),
  });

  const bucketName = "francophonixaudio";
  const folderKey = "Audio-20230715T065055Z-001/dialogue";

  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: folderKey,
  });

  try {
    const response = await s3.send(command);
    const audioFiles = response.Contents.map((file) => file.Key);
    res.status(200).json(audioFiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch audio files" });
  }
};
