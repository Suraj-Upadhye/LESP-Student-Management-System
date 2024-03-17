// controllers/teacherController.js
import Teacher from '../models/Teacher.js'
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import bcrypt from "bcryptjs";          // to provide ecryption and decryption to password
import jwt from "jsonwebtoken";


export const signupTeacher = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.securityDetails.password, salt);
    const newTeacher = new Teacher({
      personalDetails: {
        firstName: req.body.personalDetails.firstName,
        middleName: req.body.personalDetails.middleName,
        lastName: req.body.personalDetails.lastName,
        address: req.body.personalDetails.address,
        pincode: req.body.personalDetails.pincode,
        qualification: req.body.personalDetails.qualification,
        teachingExperience: req.body.personalDetails.teachingExperience,
        gender: req.body.personalDetails.gender,
      },
      securityDetails: {
        email: req.body.securityDetails.email,
        password: hashPassword,
        otp: req.body.securityDetails.otp,
        mobileNumber: req.body.securityDetails.mobileNumber
      },
      workingDetails: req.body.workingDetails, // Array of objects
      role: req.body.role
    });
    await newTeacher.save();
    return res.status(200).json(CreateSuccess(200, "Teacher Registration Request Sent Successfully!"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(CreateError(500, "Internal Server Error"));
  }
};




// workingDetails: {
//           year: req.body.workingDetails.year,
//           semester: req.body.workingDetails.semester,
//           branch: req.body.workingDetails.branch,
//           division: req.body.workingDetails.division,
//           subject: req.body.workingDetails.subject
// }



export const loginTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ 'securityDetails.email': req.body.email });

    if (!teacher) {
      console.log("Teacher not found");
      return res.status(404).json(CreateError(404, "User not found!"));
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, teacher.securityDetails.password);
    if (!isPasswordCorrect) {
      console.log("Password is incorrect");
      return res.status(400).json(CreateError(400, "Password is incorrect!"));
    }

    console.log("Teacher Login successful");
    return res.status(200).json(CreateSuccess(200, "Login Success!"));

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json(CreateError(500, "Something went wrong!"));
  }
};
