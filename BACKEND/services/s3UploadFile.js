const AWS = require("aws-sdk");

module.exports = async (data, fileName) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.Location);
      }
    });
  });
};
