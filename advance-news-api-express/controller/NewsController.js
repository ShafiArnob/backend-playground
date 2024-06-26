import {
  generateRandomNum,
  imageValidator,
  removeImage,
  uploadImage,
} from "../utils/helper.js";
import { newsSchema } from "../validations/newsValidation.js";
import prisma from "../DB/db.config.js";
import NewsApiTransform from "../transform/newsApiTransform.js";
import redisCache from "../DB/redis.config.js";

class NewsController {
  static async index(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0 || limit > 100) {
      limit = 10;
    }
    const skip = (page - 1) * limit;

    try {
      const news = await prisma.news.findMany({
        take: limit,
        skip: skip,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile: true,
            },
          },
        },
      });
      console.log(news);
      const newsTransform = news?.map((item) =>
        NewsApiTransform.transform(item)
      );

      const totalNews = await prisma.news.count();
      const totalPages = Math.ceil(totalNews / limit);

      return res.status(200).json({
        status: "success",
        data: newsTransform,
        metadata: {
          totalPages: totalPages,
          currentPage: page,
          currentLimit: limit,
        },
      });
    } catch (e) {
      console.error(e);
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
            image: newImageName,
          },
        });

        // remove cache
        redisCache.del("/api/news", (err) => {
          if (err) {
            throw err;
          }
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
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile: true,
            },
          },
        },
      });
      const transFormNews = news ? NewsApiTransform.transform(news) : null;
      return res.status(200).json({ status: "success", data: transFormNews });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
  static async update(req, res) {
    const { id } = req.params;
    const user = req.user;
    const body = req.body;
    try {
      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (user.id !== news.user_id) {
        return res.status(400).json({ message: "UnAtuhorized" });
      }
      const validatedData = await newsSchema.safeParse(body);
      if (validatedData.success) {
        const payload = validatedData.data;
        const image = req?.files?.image;
        if (image) {
          const message = imageValidator(image?.size, image?.mimetype);
          if (message !== null) {
            return res.status(400).json({
              errors: {
                image: message,
              },
            });
          }

          //Upload new image
          const imageName = uploadImage(image);
          payload.image = imageName;
          //Delete old image
          removeImage(news.image);
        }

        const updatedNews = await prisma.news.update({
          data: payload,
          where: {
            id: Number(id),
          },
        });

        return res.status(200).json({
          status: "success",
          message: "News updated successfully!",
          data: updatedNews,
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
  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
      });

      // check uf user of the req and news user is same
      if (user.id !== news?.user_id) {
        return res.status(401).json({ message: "Un Authorized" });
      }

      // Delete image from filesystem
      removeImage(news.image);
      await prisma.news.delete({
        where: {
          id: Number(id),
        },
      });

      return res
        .status(200)
        .json({ status: "success", message: "News deleted successfully!" });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }
}

export default NewsController;
