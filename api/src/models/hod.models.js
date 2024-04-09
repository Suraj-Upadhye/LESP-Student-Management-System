import mongoose, { Schema } from 'mongoose';

const hodSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email id is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        department: {
            type: String,
            required: [true, 'Department is required']
        }
    },
    {
        timestamps: true
    }
);


export const HOD = mongoose.model("HOD", hodSchema);