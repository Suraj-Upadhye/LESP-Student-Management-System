// models/student.js
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        personalDetails: {
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
                type: String,
                required: false,
                default: "https://png.pngitem.com/pimgs/s/419-4196791_transparent-confused-man-png-default-profile-png-download.png"
            }
        },

        academicDetails: {
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
            }
        },

        securityDetails: {
            studentMobileNumber: {
                type: String,
                required: true
            },
            fatherMobileNumber: {
                type: String,
                required: false,
                default:"null"
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
            }
        },

        unitTestMarks:{
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


export const User =  mongoose.model("User", userSchema);
