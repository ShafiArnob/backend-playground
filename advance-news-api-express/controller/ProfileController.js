import { generateRandomNum, imageValidator } from "../utils/helper.js";
import prisma from "../DB/db.config.js";

class ProfileController {
  static async index(req, res) {
    try {
      const user = req.user;
      return res.json({ status: 200, user });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  static async store(req, res) {}
  static async show(req, res) {}
  static async update(req, res) {
    try {
      const { id } = req.params;
      console.log("Profile Id", id);
      //check if there is files
      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .json({ status: 400, message: "Profile image is required." });
      }

      //check file is right
      const profile = req.files.profile;
      const message = imageValidator(profile?.size, profile.mimetype); //validate file and size
      if (message !== null) {
        return res.status(400).json({
          errors: {
            profile: message,
          },
        });
      }

      // processing image name
      const imgExt = profile?.name.split(".");
      const newImageName = generateRandomNum() + "." + imgExt[1];
      const uploadPath = process.cwd() + "/public/images/" + newImageName;

      // if error uploading photo
      profile.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      // update path of image to DB
      await prisma.users.update({
        data: {
          profile: newImageName,
        },
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Profile updated successfully!",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "failed",
        message: "Something went wrong please try again",
      });
    }
  }
  static async destroy(req, res) {}
}

export default ProfileController;
