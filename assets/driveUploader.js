import drive from "./driveClient.js";
import path from "path";
import fs from "fs";

const uploadFile = async (filename, mimetype, data) => {
  try {
    const result = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: mimetype,
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(data),
      },
    });
    const key = result.data.id;

    const permission = await drive.permissions.create({
      fileId: key,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    return key;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const deleteFile = async (key) => {
  try {
    const result = await drive.files.delete({
      fileId: key,
    });
  } catch (error) {}
};

export default {
  uploadFile,
  deleteFile,
};
