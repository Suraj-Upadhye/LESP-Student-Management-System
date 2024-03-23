// models/teacher.js
import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema(
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
            required: false
        },
        pincode: {
            type: String,
            required: false,
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
        adminCode: {
            type: Number,
            required: true
        },
        profilePhoto: {
            type: {
                url: String,
                public_id: String
            },      //cloudinary url
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
                        enum : ["Div1", "Div2", "None"],
                        reqired: true,
                        default: "None"
                    },
                    batch: {
                        type: String,
                        required: true
                    }
                }
            ],
        classTeacher: {
            type: String,
            required: false,
            default: "none"
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
