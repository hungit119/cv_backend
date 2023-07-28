const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const User = require("../models/User");
const argon2 = require("argon2");
var nodemailer = require("nodemailer");
class AuthController {
  async login(req, res) {
    const { username, password } = req.body;
    try {
      if (!username || !password)
        return res.status(403).json({
          message: "Invalid Params",
        });
      const user = await User.findOne({ username });
      if (user === null)
        res.status(403).json({
          message: "User not existed",
        });
      const decodedPassword = await argon2.verify(user.password, password);
      if (!decodedPassword) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password!",
        });
      } else {
        const accessToken = jwt.sign(
          { id: user.sid },
          process.env.SECRET_KEY_TOKEN
        );
        return res.json({
          success: true,
          message: "login successfully!",
          user,
          accessToken,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async register(req, res) {
    try {
      const { firstname, lastname, username, email, password, confirm } =
        req.body;
      if (
        !firstname ||
        !lastname ||
        !username ||
        !email ||
        !password ||
        !confirm
      )
        return res.status(403).json({
          message: "Invalid Params",
        });
      if (password !== confirm)
        res.status(403).json({
          message: "Password not match confirm password",
        });
      const user = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (user !== null)
        res.status(403).json({
          message: "User existed",
        });
      const hashPassword = await argon2.hash(password);
      const newUser = {
        sid: v4(),
        username,
        firstname,
        lastname,
        email,
        password: hashPassword,
      };
      const newRecord = new User({
        sid: newUser.sid,
        username: newUser.username,
        fisrtname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password,
      });
      await newRecord
        .save()
        .then((savedRecord) => {
          const accessToken = jwt.sign(
            {
              id: savedRecord.sid,
            },
            process.env.SECRET_KEY_TOKEN
          );
          return res.json({
            success: true,
            message: "Register successfully",
            user: savedRecord,
            accessToken,
          });
        })
        .catch((error) => {
          res.status(403).json({ message: "save record failed", error });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async loadUser(req, res) {
    try {
      const { userId } = req;
      const user = await User.findOne({ sid: userId });
      if (user === null)
        res.status(403).json({
          message: "load user not successfully",
        });
      if (user) {
        return res.json({
          success: true,
          message: "Load user successfully",
          user,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async googleLogin(req, res) {
    try {
      const { data } = req.body;
      const { googleId, imageUrl, email, name, givenName, familyName } = data;
      const user = await User.findOne({ email });
      if (user !== null) {
        const accessToken = jwt.sign(
          { id: user.sid },
          process.env.SECRET_KEY_TOKEN
        );
        return res.json({
          success: true,
          message: "login successfully!",
          user,
          accessToken,
        });
      } else {
        const newUser = {
          sid: googleId,
          username,
          firstname,
          lastname,
          email,
          password: "default",
        };
        const newRecord = new User({
          sid: newUser.sid,
          username: newUser.username,
          fisrtname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          password: newUser.password,
        });
        await newRecord
          .save()
          .then((savedRecord) => {
            const accessToken = jwt.sign(
              {
                id: savedRecord.sid,
              },
              process.env.SECRET_KEY_TOKEN
            );
            return res.json({
              success: true,
              message: "Login successfully",
              user: savedRecord,
              accessToken,
            });
          })
          .catch((error) => {
            res.status(403).json({ message: "save record failed", error });
          });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await User.findOne({ email })
        .then(async (response) => {
          try {
            const newPassword = "123456";
            const newHashPassword = await argon2.hash(newPassword);
            await User.updateOne({ sid }, { password: newHashPassword }).then(
              (response) => {
                var transporter = nodemailer.createTransport({
                  // config mail server
                  host: "smtp.gmail.com",
                  port: 465,
                  secure: true,
                  auth: {
                    user: "hung1522665@gmail.com", //Tài khoản gmail vừa tạo
                    pass: "vvurodqhaoerplca", //Mật khẩu tài khoản gmail vừa tạo
                  },
                  tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                  },
                });
                var content = "";
                content += `
                <div style="padding: 10px; background-color: #003375">
                    <div style="padding: 10px; background-color: white;">
                        <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                        <span style="color: black">${newPassword}</span>
                    </div>
                </div>
            `;
                var mainOptions = {
                  // thiết lập đối tượng, nội dung gửi mail
                  from: "NQH-Test nodemailer",
                  to: email,
                  subject: "Test Nodemailer",
                  text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
                  html: content, //Nội dung html mình đã tạo trên kia :))
                };
                transporter.sendMail(mainOptions, function (err, info) {
                  if (err) {
                    res.json({
                      success: true,
                      message: "Sented email",
                    });
                  } else {
                    res.status(400).json({
                      message: error.message,
                    });
                  }
                });
              }
            );
          } catch (error) {
            res.status(400).json({
              message: error.message,
            });
          }
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
module.exports = new AuthController();
