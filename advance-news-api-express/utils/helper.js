import { supportedMimes } from "../config/filesystem.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

export const imageValidator = (size, mime) => {
  if (bytesToMb(size) > 2) {
    return "Image size must be less than 2 MB";
  } else if (!supportedMimes.includes(mime)) {
    return "Image must be type of png,jpg,jpeg,svg,webp,gif..";
  }

  return null;
};

export const bytesToMb = (bytes) => {
  return bytes / (1024 * 1024);
};

export const generateRandomNum = () => {
  return uuidv4();
};

export const getImageUrl = (imgName) => {
  console.log(process.env.APP_URL);
  return `${process.env.APP_URL}/images/${imgName}`;
};
