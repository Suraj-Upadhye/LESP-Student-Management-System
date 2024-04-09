import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:"*",
    credentials: true
}));

app.use(express.json({limit: "32kb"})); // limit the size of incoming JSON payloads to (16kb)
app.use(express.urlencoded({extended: true, limit: "32kb"}));
app.use(express.static("public"));
app.use(cookieParser());



// routes import 
import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import authRouter from './routes/auth.routes.js';
import subjectRouter from './routes/subject.routes.js';
import attendanceRouter from './routes/attendance.routes.js'
import hodRouter from './routes/hod.routes.js';


// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/subject", subjectRouter)
app.use("/api/v1/attendance", attendanceRouter)
app.use("/api/v1/hod", hodRouter)


// http://localhost:8000/api/v1/users/register
export {app};