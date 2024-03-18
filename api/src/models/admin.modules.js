// models/teacher.js
import mongoose, { Schema } from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        // personalDetails:-
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
            default: 0
        },
        qualification: {
            type: String,
            required: true
        },
        teachingExperience: {
            type: Number,
            required: true,
            default: 0
        },
        profilePhoto: {
            type: String,
            required: false,
        },
        // securityDetails:-
        mobileNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
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
        isClassTeacher: {
            type: Boolean,
            required: false,
            default: false
        },
        
        // workingDetails :-
        workingDetails:
            [{
                year: {
                    type: Number,
                    required: true
                },
                semester: {
                    type: Number,
                    required: true
                },
                branch: {
                    type: String,
                    required: true
                },
                division: {
                    type: String,
                    reqired: true
                },
                subject: {
                    type: String,
                    required: true
                }
            }],
        classTeacher: {
            type: String,
            required: false,
            default: "none"
        },
        sharedResource: {
            type: Schema.Types.Array,
            required: false,
            ref: 'SharedResource'
        },
        role: {
            type: String,
            enum: ['Teacher', 'HOD'],
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const Admin = mongoose.model("Admin", adminSchema);
