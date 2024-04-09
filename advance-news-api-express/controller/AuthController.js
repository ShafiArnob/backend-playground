import { sendEmail } from "../config/mailer.js";
import prisma from "../DB/db.config.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validatedData = registerSchema.safeParse(body);
      if (validatedData.success) {
        const data = validatedData.data;

        //check if email is already in use and if email is in use send error
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

        // register user
        const user = await prisma.users.create({
          data: data,
        });
        return res.status(200).json({
          status: "success",
          message: "User created successfully",
          data: user,
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

  static async login(req, res) {
    try {
      const body = req.body;
      const validatedData = await loginSchema.safeParse(body);

      if (validatedData.success) {
        const data = validatedData.data;
        // find user with email
        const findUser = await prisma.users.findUnique({
          where: {
            email: data.email,
          },
        });
        if (findUser) {
          //if password does not match
          if (!bycrypt.compareSync(data.password, findUser.password)) {
            return res.status(400).json({
              status: "failed",
              message: "Invalid credentials",
            });
          }

          //issue token to user
          const payloadData = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            profile: findUser.profile, //! might need to remode later
          };
          const token = jwt.sign(payloadData, process.env.JWT_SECRET);
          return res
            .status(200)
            .json({ status: "success", message: "Logged In", token: token });
        }
        return res.status(500).json({
          status: "failed",
          message: "No user with this email found",
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

  static async sendTestEmail(req, res) {
    try {
      const { email } = req.query;
      const payload = {
        toEmail: email,
        subject: "This is a test email subject",
        body: "<h1>This is a test email body</h1>",
      };

      await sendEmail(payload.toEmail, payload.subject, payload.body);

      return res.status(200).json({ status: "success", message: "Email Sent" });
    } catch (error) {
      console.error({ type: "Email Error", body: error });
      return res
        .status(500)
        .json({ status: "failed", message: "Something Went Wrong." });
    }
  }
}

export default AuthController;
