import crypto from "crypto";

export const md5 = (text) => {
  return crypto.createHash("md5").update(text).digest("hex");
};