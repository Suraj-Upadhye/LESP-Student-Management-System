import mongoose, {Schema} from 'mongoose';

const TokenSchema = new Schema (
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        adminId:{
            type : Schema.Types.ObjectId,
            ref:"Admin"
        },
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 300
        }
    },
    {
        timestamps: true
    }
);

export const Token = mongoose.model("Token", TokenSchema)