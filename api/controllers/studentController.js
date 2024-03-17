// controllers/studentController.js
import Student from "../models/Student.js"
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import bcrypt from "bcryptjs";          // to provide ecryption and decryption to password
import jwt from "jsonwebtoken";

export const signupStudent = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.securityDetails.password, salt);
    const newStudent = new Student(
      {

        personalDetails: {
          firstName: req.body.personalDetails.firstName,
          middleName: req.body.personalDetails.middleName,
          lastName: req.body.personalDetails.lastName,
          address: req.body.personalDetails.address,
          pincode: req.body.personalDetails.pincode,
          gender: req.body.personalDetails.gender,
          profilePhoto: req.body.personalDetails.profilePhoto
        },

        securityDetails: {
          email: req.body.securityDetails.email,
          password: hashPassword,
          otp: req.body.securityDetails.otp,
          studentMobileNumber: req.body.securityDetails.studentMobileNumber,
          fatherMobileNumber: req.body.securityDetails.fatherMobileNumber,
          motherMobileNumber: req.body.securityDetails.motherMobileNumber
        },
        academicDetails: {
          year: req.body.academicDetails.year,
          branch: req.body.academicDetails.branch,
          division: req.body.academicDetails.division,
          enrollmentNo: req.body.academicDetails.enrollmentNo,
          rollNo: req.body.academicDetails.rollNo
        },
        role: req.body.role
      }
    );
    await newStudent.save();
    return res.status(200).json(CreateSuccess(200, "Student Registration Request Sent Successfully!"));
  } catch (error) {
    return res.status(500).json(CreateError(500, "Internal Server Error"));
    // return next(CreateError(500, "Internal Server Error!"));
  }
};

// export const loginStudent = async (req, res, next) => {

//   try {
//     const student = await Student.findOne({ ['securityDetails.email']: req.body.email });
//     // .populate("roles","role");  // populate the reference of role in users table with fields of role collection

//     // const { roles } = user;
//     if (!student) {
//       console.log("here1");
//       // console.log([securityDetails.email]);
//       // return next(CreateError(404, "User not found!"));
//       return res.status(200).json(CreateError(404, "User not found!"));
//     }
//     const isPasswordCorrect = await bcrypt.compare(req.body.password, student.securityDetails.password);
//     if (!isPasswordCorrect) {
//       // return next(CreateError(400, "Pasword is incorrect!"));
//       return res.status(400).json(CreateError(400, "Password is incorrect!"));
//     }

//     // const token = jwt.sign(
//     //     {id: student._id, isAdmin: user.isAdmin, roles: roles},
//     //     process.env.JWT_SECRET
//     // );

//     // res.cookie("access_token", token, {httpOnly: true})
//     // .status(200)
//     // .json({
//     //     status: 200,
//     //     message: "Login Success!",
//     //     data: user
//     // });
//     console.log("here2");
//     return res.status(200).json(CreateSuccess(200, "Login Success!"));


//   } catch (error) {
//     // return next(CreateError(500, "Something went wrong!"));
//     return res.status(500).json(CreateError(500, "Something went wrong!"));
//   }

// };


export const loginStudent = async (req, res, next) => {
  try {
    const student = await Student.findOne({ 'securityDetails.email': req.body.email });

    if (!student) {
      console.log("Student not found");
      return res.status(404).json(CreateError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, student.securityDetails.password);
    if (!isPasswordCorrect) {
      console.log("Password is incorrect");
      return res.status(400).json(CreateError(400, "Password is incorrect!"));
    }

    console.log("Student Login successful");
    return res.status(200).json(CreateSuccess(200, "Login Success!"));

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json(CreateError(500, "Something went wrong!"));
  }
};
