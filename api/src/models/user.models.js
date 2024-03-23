// models/student.js
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        // personalDetails :-
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
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
        profilePhoto: {
            type: {
                url: String,
                public_id: String
            },       //cloudinary url
            required: false,
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
            default: ""
        },
        motherMobileNumber: {
            type: String,
            required: false,
            default: ""
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        otp: {
            type: String,
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

        // unitTestMarks: {
        //     type: [Schema.Types.ObjectId],
        //     ref: 'UnitTest',
        //     required: false
        // },

        // allAttendanceData: {
        //     type: [Schema.Types.Array],
        //     required: false,
        //     ref: "Attendance"
        // },
        role: {
            type: String,
            enum: ['Student'],
            default: "Student"
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

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
