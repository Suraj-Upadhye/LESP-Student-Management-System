import mongoose, { Schema } from "mongoose";

const AttendanceSchema = mongoose.Schema(
    {
        dailyAttendanceData: {
            date: {
                type: Date,
                required: true
            },
            Period: [
                {
                    subjectName: {
                        type: String,
                        required: true
                    },
                    state: {
                        type: String,
                        enum: ["Present", "Absent", "Leave"],
                        required: true,
                        default: "Present"
                    },
                    sessionTpe:{
                        type: String,
                        enum: ['Theory', 'Practical', 'Tutorial'],
                        required: true
                    },
                    batchBelongs: {
                        type: String,
                        required: true
                    },
                    remark: {
                        type: String,
                        required: true,
                        default: "Remark is not added"
                    }
                }
            ],
            totalPeriodsTrack: {
                lectures:{
                    type: Number,
                    required: true,
                    default: 0
                },
                practicals:{
                    type: Number,
                    requierd: true,
                    default: 0
                },
                sumOfBoth:{
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        }
    },
    {
        timestamps: true
    }
);

export const Attendance = mongoose.model("Attendance", AttendanceSchema);