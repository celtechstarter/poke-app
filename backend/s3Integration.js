const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");

// S3-Client für Region eu-central-1
const s3 = new S3Client({ region: "eu-central-1" });

/**
 * Funktion zum Hochladen von Dateien in S3
 * @param {string} bucketName - Name des S3-Buckets
 * @param {string} key - Schlüssel/Name der Datei im Bucket
 * @param {Buffer | string} data - Dateiinhalt (Buffer oder String)
 * @param {string} contentType - MIME-Typ der Datei
 */
const uploadToS3 = async (bucketName, key, data, contentType) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: data,
      ContentType: contentType,
    };
    await s3.send(new PutObjectCommand(params));
    console.log(`Datei erfolgreich hochgeladen: ${key}`);
  } catch (error) {
    console.error("Fehler beim Hochladen der Datei:", error.message);
    throw error;
  }
};

/**
 * Funktion zum Abrufen von Dateien aus S3
 * @param {string} bucketName - Name des S3-Buckets
 * @param {string} key - Schlüssel/Name der Datei im Bucket
 * @returns {Buffer} - Dateiinhalt als Buffer
 */
const getFromS3 = async (bucketName, key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const response = await s3.send(new GetObjectCommand(params));

    // Dateiinhalt als Buffer lesen
    const stream = response.Body;
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    console.log(`Datei erfolgreich abgerufen: ${key}`);
    return Buffer.concat(chunks);
  } catch (error) {
    console.error("Fehler beim Abrufen der Datei:", error.message);
    throw error;
  }
};

/**
 * Funktion zum Löschen von Dateien aus S3
 * @param {string} bucketName - Name des S3-Buckets
 * @param {string} key - Schlüssel/Name der Datei im Bucket
 */
const deleteFromS3 = async (bucketName, key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    await s3.send(new DeleteObjectCommand(params));
    console.log(`Datei erfolgreich gelöscht: ${key}`);
  } catch (error) {
    console.error("Fehler beim Löschen der Datei:", error.message);
    throw error;
  }
};

module.exports = {
  uploadToS3,
  getFromS3,
  deleteFromS3,
};
