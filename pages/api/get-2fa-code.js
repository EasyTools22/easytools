
import speakeasy from "speakeasy";

export default function handler(req, res) {
  const code = speakeasy.totp({
    secret: "MTQ4S3RHBQJGD2KCPOYDD6F5MWZ2K25I",
    encoding: "base32"
  });

  res.status(200).json({ code });
}
