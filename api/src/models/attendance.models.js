// attendance.models.js

import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    attendanceData: [
        {
            teacherId: {    // use year, sem , branch
                type: Schema.Types.ObjectId,
                ref: "Admin"
            },
            subjectId: {      // use year, sem , branch
                type: Schema.Types.ObjectId,
                ref: "Subject"
            },
            studentList: [
                {
                    studentId: {        // use year, sem , branch
                        type: Schema.Types.ObjectId,
                        ref: "User"
                    },
                    state: {
                        type: String,
                        enum: ["Present", "Absent", "Leave"],
                        required: [true, 'Attendance state is required'],
                        default: "Present"
                    }
                },
            ],
            sessionType: {
                type: String,
                enum: ['Lecture', 'Practical', 'Tutorial'],
                required: [true, 'Session type is required']
            },
            batchBelongs: {
                type: String,
                required: false
            },
            remark: {
                type: String,
                // required: [true, 'Remark / Note is required'],
                required: false
            }
        }
    ]
}, {
    timestamps: true
});

export const Attendance = mongoose.model("Attendance", AttendanceSchema);
