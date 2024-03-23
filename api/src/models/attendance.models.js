import mongoose, { Schema }  from "mongoose";

const AttendanceSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    attendanceData: [
        {
            student: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            teacher: {
                type: Schema.Types.ObjectId,
                ref: "Admin"
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: "Subject"
            },
            state: {
                type: String,
                enum: ["Present", "Absent", "Leave"],
                required: [true, 'Attendance state is required'],
                default: "Present"
            },
            sessionType: {
                type: String,
                enum: ['Theory', 'Practical', 'Tutorial'],
                required: [true, 'Session type is required']
            },
            batchBelongs: {
                type: String,
                required: false
            },
            remark: {
                type: String,
                required: [true, 'Remark / Note is required'],
            }
        }
    ]
}, {
    timestamps: true
});

export const Attendance = mongoose.model("Attendance", AttendanceSchema);
