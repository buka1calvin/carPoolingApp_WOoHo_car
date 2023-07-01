import User from "../models/user";
import {
  registerUser,
  findUserById,
  findUserByEmail,
} from "../service/user.service";
import { BcryptUtil } from "../utils/bcrypt";
import { generateToken } from "../utils/generateToken";
import generateOTP from "../utils/generateOTP";
import OTP from "../models/Otp";
import validationOTPmail from "../service/emailValidation.service";
import { logout } from "../service/user.service";
import { sendDriverProfileUpdateEmail } from "../service/emailValidation.service";

export const createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      role,
      phoneNumber,
      password,
      isActive,
    } = req.body;
    const userData = {
      firstname,
      lastname,
      email,
      role,
      phoneNumber,
      password,
      isActive,
    };
    const response = await registerUser(userData);
    const token = generateToken(userData, { expiresIn: "10min" });
    return res.status(201).json({
      user: response,
      token: token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(400).json({ error: "user don't exist!" });
    }
    const passwordMaches = await BcryptUtil.compare(
      req.body.password,
      foundUser.password
    );
    if (!passwordMaches) {
      return res.status(400).json({ error: "passwords don't match!" });
    }
    const userToken = {
      id: foundUser.id,
      firstname: foundUser.firstname,
      email: foundUser.email,
      role: foundUser.role,
      isactive: foundUser.isActive,
    };
    const token = generateToken(userToken);
    const otp = generateOTP();

    if (foundUser.role === "driver" || foundUser.role === "passenger") {
      try {
        const newOTP = new OTP({
          otp,
          email: foundUser.email,
        });
        await newOTP.save();
        await validationOTPmail(foundUser, otp, token);
        res.status(200).json({
          message: "user logged in successfully!",
          user: {
            id: foundUser.id,
            firstname: foundUser.firstname,
            email: foundUser.email,
            role: foundUser.role,
            isactive: foundUser.isActive,
          },
          token: token,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    if (foundUser.role === "admin") {
      res.status(200).json({
        message: "user logged in successfully!",
        user: {
          id: foundUser.id,
          firstname: foundUser.firstname,
          email: foundUser.email,
          role: foundUser.role,
          isactive: foundUser.isActive,
        },
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await findUserById(userId);
    if (user) {
      return res.status(200).json({ userDetails: user });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const decodeUser = await findUserByEmail(userEmail);

    if (!decodeUser) return res.status(401).json("user not found");
    const billingAddress = {
      province: req.body.province || "",
      district: req.body.district || "",
      street: req.body.street || "",
      email: req.body.email || "",
    };

    const user = await User.findByIdAndUpdate(
      decodeUser._id,
      {
        $set: {
          userId: req.body.userId || decodeUser.userId,
          dob: req.body.DOB || decodeUser.DOB,
          gender: req.body.gender || decodeUser.gender,
          preferredLanguage:
            req.body.preferredLanguage || decodeUser.preferredLanguage,
          preferredCurrency:
            req.body.preferredCurrency || decodeUser.preferredCurrency,
          billingAddress: billingAddress,
          phoneNumber: req.body.phoneNumber || decodeUser.phoneNumber,
          profilePic: req.file.path || decodeUser.profilePic,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ user: user, message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDriverProfile = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const decodeUser = await findUserByEmail(userEmail);

    if (!decodeUser) return res.status(401).json("User not found");

    const { driverLicenseNumber } = req.body;
    const carPictures = req.files.map((img) => img.path);

    const updates = {
      driverLicenseNumber,
      carPictures,
      verificationStatus: "pending",
    };

    const user = await User.findByIdAndUpdate(
      decodeUser._id,
      {
        $set: updates,
      },
      { new: true }
    );
    const { _id, firstname, lastname } = user;
    const person = { _id, firstname, lastname };

    await sendDriverProfileUpdateEmail(person, updates);
    res.status(200).json({
      user: user,
      message: "Driver profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVerificationStatus = async (req, res) => {
  try {
    const adminUser = req.user;
    const { id } = req.params;

    const { verificationStatus } = req.body;

    if (adminUser.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admin users can update verification status" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { verificationStatus },
      },
      { new: true }
    );
    if (verificationStatus === "approved") {
      user.role = "driver";
      await user.save();
    }

    return res.status(200).json({
      user: user,
      message: "Verification status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await logout(req.headers.authorization);
    return res.status(200).json({
      message: "Successfully logged out.",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
