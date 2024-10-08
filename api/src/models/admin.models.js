// admin.models.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema(
    {
        // personalDetails:-
        firstName: {
            type: String,
            required: [true, "firstName is required"],
        },
        middleName: {
            type: String,
            required: [true, "middleName is required"]
        },
        lastName: {
            type: String,
            required: [true, "lastName is required"]
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: [true, 'gender is required']
        },
        address: {
            type: String,
            required: false,
            default: "Not Provided"
        },
        pincode: {
            type: String,
            required: false,
            default: "Not Provided"
        },
        qualification: {
            type: String,
            required: [true, "qualification is required"]
        },
        teachingExperience: {
            type: Number,
            required: [true, 'teaching Experience is required'],
        },
        adminCode: {
            type: Number,
            required: false
            // required: [true, "admin code is required"],
            // unique: true
        },
        // profilePhoto: {
        //     type: {
        //         url: String,
        //         public_id: String
        //     },      //cloudinary url
        //     required: false,
        // },
        profilePhoto: {
            type: String,
            required: false,
            default: "https://res.cloudinary.com/dk5cr6qga/image/upload/v1710748095/xowjbmq7hqz5vr9iyjkb.jpg"
        },
        // securityDetails:-
        mobileNumber: {
            type: String,
            required: [true, 'Mobile number is required'],
        },
        email: {
            type: String,
            required: [true, 'Email id is required'],
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
        isClassTeacher: {
            type: Boolean,
            required: false,
            default: false
        },
        isHOD: {
            type: Boolean,
            require: false,
            default: false
        },

        // workingDetails :-
        workingDetails:
            [
                {
                    subject: {
                        type: Schema.Types.ObjectId,
                        ref: "Subject"
                    },
                    division: {
                        type: String,
                        enum: ["Div1", "Div2", "None"],
                        reqired: [true, 'division is required'],
                    },
                    sessionType: {
                        type: [],
                        required: [true, 'mode of session is required']
                    },
                    batch: {
                        type: [],
                        required: [true, 'Batch is required']
                    }
                }
            ],
        classTeacher: {
            year: {
                type: String,
                required: false,
            },
            branch: {
                type: String,
                required: false,
            },
            semester: {
                type: String,
                required: false,
            },
            division: {
                type: String,
                required: false
            }
        },
        department: {
            type: String,
            required: [true, 'department is required'],
        },
        role: {
            type: String,
            enum: ['Teacher', 'HOD'],
            default: 'Teacher',
            required: [true, 'role is required'],
        },
        resetToken: {
            type: String,
            default: null
        },
        resetTokenExpire: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);


adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    this.adminCode = getRandomIntInclusive()
    next()
})

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            adminCode: this.adminCode,
            userType: "admin"
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userType: "admin"
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const Admin = mongoose.model("Admin", adminSchema);



function getRandomIntInclusive() {
    let min = Math.ceil(1);
    let max = Math.floor(500);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
