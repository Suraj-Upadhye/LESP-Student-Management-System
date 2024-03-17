// models/student.js
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        // personalDetails :-
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        address: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: false,
            default: "0"
        },
        profilePhoto: {
            type: String,       //cloudinary url
            required: false,
            default: "I:\D Drive Backup\MegaProject\LESP-Student-Management-System\api\public\temp\default_profile.png"
        },

        // academicDetails :-
        year: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true,
        },
        division: {
            type: String,
            enum: ['Div1', 'Div2', 'None'],
            required: true,
        },
        enrollmentNo: {
            type: String,
            required: true,
            unique: true,
        },
        rollNo: {
            type: String,
            required: true,
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
            required: true
        },
        fatherMobileNumber: {
            type: String,
            required: false,
            default: "null"
        },
        motherMobileNumber: {
            type: String,
            required: false,
            default: "null"
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        otp: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
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

        unitTestMarks: {
            type: [Schema.Types.ObjectId],
            ref: 'UnitTest',
            required: false
        },

        allAttendanceData: {
            type: [Schema.Types.Array],
            required: false,
            ref: "Attendance"
        },
        role: {
            type: String,
            enum: ['Student'],
            required: true
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

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            rollNo: this.rollNo,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
