import s3 from "./awsConfig";
// const s3 = new AWS.S3();
export const fetchAudioFiles = async () => {
  const bucketName = "francophonixaudio";
  const folderKey = "Audio-20230715T065055Z-001/";

  const params = {
    Bucket: bucketName,
    Prefix: folderKey,
  };

  try {
    const data = await s3.send(new ListObjectsV2Command(params));
    const audioFiles = data.Contents.map((file) => file.Key);
    return audioFiles;
    console.log("audioFiles", audioFiles);
  } catch (error) {
    throw new Error("Failed to fetch audio files: " + error.message);
  }
};

// import AWS from './awsConfig';

// const s3 = new AWS.S3();

// export const fetchAudioFiles = async () => {
//   const bucketName = 'francophonixaudio';
//   const folderKey = 'Audio-20230715T065055Z-001/';

//   const params = {
//     Bucket: bucketName,
//     Prefix: folderKey,
//   };

//   try {
//     const data = await s3.listObjectsV2(params).promise();
//     const audioFiles = data.Contents.map((file) => file.Key);
//     return audioFiles;
//   } catch (error) {
//     throw new Error('Failed to fetch audio files: ' + error.message);
//   }
// };
