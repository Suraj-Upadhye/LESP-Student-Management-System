// user.models.js

import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        // personalDetails :-
        firstName: {
            type: String,
            required: [true, 'firstName field is required'],
        },
        middleName: {
            type: String,
            required: [true, 'middleName field is required'],
        },
        lastName: {
            type: String,
            required: [true, 'lastName field is required'],
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: [true, 'gender field is required']
        },
        address: {
            type: String,
            required: false,
            default: ""
        },
        pincode: {
            type: String,
            required: false,
            default: ""
        },
        // profilePhoto: {
        //     type: {
        //         url: String,
        //         public_id: String
        //     },       //cloudinary url
        //     required: false,
        // },
        profilePhoto: {
            type: String,
            required: false,
            default: "https://res.cloudinary.com/dk5cr6qga/image/upload/v1710748095/xowjbmq7hqz5vr9iyjkb.jpg"
        },

        // academicDetails :-
        year: {
            type: String,
            required: [true, 'year field cannot be empty']
        },
        branch: {
            type: String,
            required: [true, 'branch field is required'],
        },
        semester: {
            type: String,
            required: [true, 'Semester field is required']
        },
        division: {
            type: String,
            enum: ['Div1', 'Div2', 'None'],
            required: [true, 'division field is required'],
        },
        enrollmentNo: {
            type: String,
            required:  [true, 'enrollment field is required'],
            unique: true,
        },
        rollNo: {
            type: String,
            required:  [true, 'rollNo field is required'],
            unique: true
        },
        batch: {
            type: String,
            required: false,
            default: "Not Allocated"
        },

        // securityDetails :-
        studentMobileNumber: {
            type: String,
            required:  [true, 'studentMobileNumber field is required']
        },
        fatherMobileNumber: {
            type: String,
            required: false,
            default: ""
        },
        motherMobileNumber: {
            type: String,
            required: false,
            default: ""
        },
        email: {
            type: String,
            required: [true, 'email field is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        isEmailVerified: {
            type: Boolean,
            required: false,
            default: false
        },
        isBatchAllocated: {
            type: Boolean,
            required: false,
            default: false
        },
        role: {
            type: String,
            enum: ['Student'],
            default: "Student"
        },
        resetToken: {
            type: String,
            default: null
        },
        resetTokenExpire: {
            type: Date,
            default: null
        },
        isAcademicYearCompleted:{
            type: String,
            required: false,
            default: false
        }
    },
    {
        timestamps: true
    },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            rollNo: this.rollNo,
            userType: "user"
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userType: "user"
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
