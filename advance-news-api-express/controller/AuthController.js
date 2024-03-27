import prisma from "../DB/db.config.js";
import { registerSchema } from "../validations/authValidation.js";
import bycrypt from "bcrypt";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validatedData = registerSchema.safeParse(body);
      if (validatedData.success) {
        const data = validatedData.data;

        //check if email is already in use
        const findUser = await prisma.users.findUnique({
          where: {
            email: data.email,
          },
        });

        if (findUser) {
          return res.status(400).json({
            errors: {
              email: "Email already taken. Please use unique email.",
            },
          });
        }

        // encrypt the password
        const salt = bycrypt.genSaltSync(10);
        data.password = bycrypt.hashSync(data.password, salt);

        const user = await prisma.users.create({
          data: data,
        });

        return res.status(200).json({
          status: "success",
          message: "User created successfully",
          data: user,
        });
      } else {
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
}

export default AuthController;
