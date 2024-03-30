import { generateRandomNum, imageValidator } from "../utils/helper.js";
import { newsSchema } from "../validations/newsValidation.js";
import prisma from "../DB/db.config.js";

class NewsController {
  static async index(req, res) {
    try {
    } catch (e) {
      console.error();
    }
  }
  static async store(req, res) {
    try {
      const user = req.user;
      const body = req.body;
      const validatedData = await newsSchema.safeParse(body);
      if (validatedData.success) {
        const data = validatedData.data;

        //check if there is files
        if (!req.files || Object.keys(req.files).length === 0) {
          return res
            .status(400)
            .json({ status: 400, message: "News image is required." });
        }

        //check file is right
        const image = req.files.image;
        const message = imageValidator(image?.size, image.mimetype);
        if (message !== null) {
          return res.status(400).json({
            errors: {
              image: message,
            },
          });
        }

        // processing image name
        const imgExt = image?.name.split(".");
        const newImageName = generateRandomNum() + "." + imgExt[1];
        const uploadPath = process.cwd() + "/public/images/" + newImageName;

        // if error uploading photo
        image.mv(uploadPath, (err) => {
          if (err) throw err;
        });

        // update path of image to DB
        const created = await prisma.news.create({
          data: {
            user_id: user.id,
            title: data.title,
            content: data.content,
            image: uploadPath,
          },
        });

        return res.status(200).json({
          status: "success",
          data: created,
          message: "News Created Successfully",
        });
      } else {
        // format the error and send the error
        const validationErrors = validatedData.error.errors;
        const formattedErrors = validationErrors.map((error) => ({
          message: error.message,
          field: error.path[0],
        }));
        console.error("Validation errors:", formattedErrors);
        return res.status(400).json({
          status: "failed",
          message: "failed to validate data",
          errors: formattedErrors,
        });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        status: "failed",
        message: "Something went wrong please try again",
      });
    }
  }
  static async show(req, res) {
    try {
    } catch (e) {
      console.error();
    }
  }
  static async update(req, res) {
    try {
    } catch (e) {
      console.error();
    }
  }
  static async destroy(req, res) {
    try {
    } catch (e) {
      console.error();
    }
  }
}

export default NewsController;
