// admin.controller.js

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from '../models/admin.models.js';
import { sendNewUserAcceptedEmail } from '../utils/sendEmail.js';

// Done
const registerAdmin = asyncHandler(async (req, res) => {
    const {
        firstName, middleName, lastName, gender, qualification, teachingExperience,
        mobileNumber, email, password, workingDetails, hodDepartment, role
    } = req.body;

    console.log("Email :", email);
    console.log(firstName, middleName, lastName, gender, qualification, teachingExperience, mobileNumber, email, password, role);

    console.log("Working details:", workingDetails);

    // Check if any required field is missing or empty
    if ([firstName, middleName, lastName, gender, qualification, mobileNumber, email, password, role].some(field => !field?.trim())) {
        if (!teachingExperience)
            throw new ApiError(400, "All fields are required");
    }


    // Check if admin with the same email already exists
    const existedAdmin = await Admin.findOne({ email });
    if (existedAdmin) {
        throw new ApiError(409, "Admin with this email already exists.");
    }

    // Upload profile photo if provided
    let profilePhotoUrl = "";
    if (req.files && req.files.profilePhoto) {
        const profilePhotoLocalPath = req.files.profilePhoto[0].path;
        profilePhotoUrl = await uploadOnCloudinary(profilePhotoLocalPath);
        if (!profilePhotoUrl) {
            throw new ApiError(400, "Profile photo upload failed.");
        }
    }

    // Create new admin
    const admin = await Admin.create({
        firstName, middleName, lastName, gender, qualification, teachingExperience,
        mobileNumber, email: email.toLowerCase(), password, profilePhoto: profilePhotoUrl,
        workingDetails, hodDepartment, role
    });

    // Return success response
    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken");
    if (!createdAdmin) {
        throw new ApiError(500, "Failed to register admin.");
    }
    res.status(201).json(new ApiResponse(200, createdAdmin, "Admin registered successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.user._id);
    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    admin.password = newPassword;
    await admin.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select("-password -refreshToken");

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    return res.status(200).json(new ApiResponse(200, admin, "Admin fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {
        firstName, middleName, lastName, gender, address, pincode, qualification, teachingExperience,
        mobileNumber, email
    } = req.body;

    const admin = await Admin.findById(req.user._id);

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    // Update the admin's details
    admin.firstName = firstName || admin.firstName;
    admin.middleName = middleName || admin.middleName;
    admin.lastName = lastName || admin.lastName;
    admin.gender = gender || admin.gender;
    admin.address = address || admin.address;
    admin.pincode = pincode || admin.pincode;
    admin.qualification = qualification || admin.qualification;
    admin.teachingExperience = teachingExperience || admin.teachingExperience;
    admin.mobileNumber = mobileNumber || admin.mobileNumber;
    admin.email = email || admin.email;

    await admin.save();

    return res.status(200).json(new ApiResponse(200, admin, "Account details updated successfully"));
});

const updateAdminProfilePhoto = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id);

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    // Check if there is a profile photo file in the request
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }

    const profilePhotoLocalPath = req.file.path;

    // Upload the profile photo to Cloudinary
    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);

    if (!profilePhoto) {
        throw new ApiError(500, "Failed to upload profile photo");
    }

    // Update the admin's profile photo URL
    admin.profilePhoto = {
        url: profilePhoto.url,
        public_id: profilePhoto.public_id
    };

    await admin.save();

    // Return the updated admin document
    return res.status(200).json(new ApiResponse(200, admin, "Admin profile photo updated successfully"));
});

const updateAdminCode = asyncHandler(async (req, res) => {
    const { newAdminCode } = req.body;
    const adminId = req.user._id; // Assuming admin ID is available in the request

    if (!newAdminCode) {
        throw new ApiError(400, "New admin code is required");
    }

    // Check if the new admin code is unique
    const isExistingAdminCode = await Admin.findOne({ adminCode: newAdminCode });
    if (isExistingAdminCode) {
        throw new ApiError(409, "New admin code already exists");
    }

    // Update admin code
    const admin = await Admin.findByIdAndUpdate(
        adminId,
        { adminCode: newAdminCode },
        { new: true }
    );

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    res.status(200).json(new ApiResponse(200, admin, "Admin code updated successfully"));
});

const getAdminCode = asyncHandler(async (req, res) => {
    const adminId = req.user._id; // Assuming admin ID is available in the request

    // Find admin by ID and select only the admin code
    const admin = await Admin.findById(adminId).select("adminCode");

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    res.status(200).json(new ApiResponse(200, admin, "Admin code fetched successfully"));
});

const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        // If user doesn't exist, return error
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Set reset token and expiry time
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds
        await user.save();

        // Send email to user with reset link
        const resetUrl = `${req.protocol}://${req.get('host')}/api/resetpassword/${resetToken}`;
        const message = `To reset your password, click on this link: ${resetUrl}`;

        // Code to send email (replace this with your email sending logic)
        await sendEmail(user.email, 'Password Reset', message);

        res.status(200).json(new ApiResponse(200, {}, "Password reset link sent successfully"));
    } catch (error) {
        throw new ApiError(500, "Error sending password reset link");
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, password, confirmPassword } = req.body;

    try {
        // Find user by reset token and check if reset token is valid
        const user = await User.findOne({ resetToken, resetTokenExpire: { $gt: Date.now() } });

        // If user not found or reset token expired, throw error
        if (!user) {
            throw new ApiError(400, "Invalid or expired reset token");
        }

        // Validate password and confirmPassword match
        if (password !== confirmPassword) {
            throw new ApiError(400, "Passwords do not match");
        }

        // Set new password and clear reset token fields
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        // Save updated user
        await user.save();

        // Send success response
        res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
    } catch (error) {
        throw new ApiError(500, "Error resetting password");
    }
});

const getCurrentAdminEssentials = asyncHandler(async (req, res) => {
    try {
        // Find the current admin by ID and select essential fields
        const admin = await Admin.findById(req.user.id).select("firstName lastName profilePhoto email");

        // Send response with admin essentials
        res.json({
            success: true,
            data: admin
        });
    } catch (error) {
        throw new ApiError(500, "Error fetching admin essentials");
    }
});

// Done
// returns subjects list assigned to teacher/hod(admin) along with year, sem , branch, theory/practical/tutorial, batch options
const getSubjectSwitchOptionList = asyncHandler(async (req, res) => {
    try {
        const { role, _id } = req.user; // Extract user role and ID from request user object

        let subjects = []; // Initialize subjects array

        // Check user role to determine the type of subjects to fetch
        if (role === 'Teacher' || role === 'HOD') {
            // Fetch subjects assigned to the teacher or HOD based on their ID
            subjects = await Admin.aggregate([
                {
                    $match: {
                        _id: _id
                    }
                },
                {
                    $unwind: "$workingDetails" // Unwind the workingDetails array
                },
                {
                    $lookup: {
                        from: "subjects", // The collection to join with
                        localField: "workingDetails.subject", // Field from the Admin collection
                        foreignField: "_id", // Field from the Subjects collection
                        as: "subjectDetails" // Output array field
                    }
                },
                {
                    $unwind: "$subjectDetails" // Unwind the subjectDetails array
                },
                {
                    $project: {
                        _id: "$subjectDetails._id", // Subject ID
                        year: "$subjectDetails.year", // Subject year
                        semester: "$subjectDetails.semester", // Subject semester
                        branch: "$subjectDetails.branch", // Subject branch
                        subject: "$subjectDetails.subject", // Subject name
                        division: "$workingDetails.division", // Division
                        sessionType: "$workingDetails.sessionType", // Session type
                        batch: "$workingDetails.batch" // Batch
                    }
                }
            ]);
        }

        // Return the list of subjects with relevant details
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});



// high security
// Done
const newTeacherList = asyncHandler(async (req, res) => {
    try {
        // 1. Extract the department information of the HOD from the JWT token.
        const { department } = req.user; // Assuming department information is stored in the user object

        // Debugging: Log the department value
        console.log("Department:", department);

        // 2. Use aggregation to filter teachers who belong to the same department and have unverified emails.
        const newTeachers = await Admin.aggregate([
            {
                $match: {
                    department: department, // Filter by department
                    role: "Teacher", // Filter by role
                    isEmailVerified: false // Filter by unverified email
                }
            },
            {
                $project: {
                    password: 0,
                    refreshToken: 0 // Exclude password and refreshToken fields from the results
                }
            }
        ]);

        console.log("Filtered Teachers:", newTeachers);

        // 3. Return the filtered list of teachers as the response.
        res.status(200).json({
            success: true,
            data: newTeachers
        });
    } catch (error) {
        // Error handling: Log and send error response
        console.error("Error fetching new teachers:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});

// Done
const acceptNewTeacher = asyncHandler(async (req, res) => {
    try {
        const { teacherId } = req.params;
        console.log(teacherId);

        // Find the teacher by ID and update their status to accepted
        const teacher = await Admin.findByIdAndUpdate(
            teacherId,
            {
                $set: { isEmailVerified: true }
            },
            { new: true }
        );

        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }
        // Send a notification email to the teacher's registered email address
        sendNewUserAcceptedEmail(teacher.email, teacher.role, teacher.firstName);

        res.status(200).json(new ApiResponse(200, teacher, "Teacher accepted successfully"));
    } catch (error) {
        throw new ApiError(500, "Error accepting teacher");
    }
});

// Done
const newStudentList = asyncHandler(async (req, res) => {
    // get list of student who's email is not verified
    try {
        // 1. Extract the class name information of the teacher from the JWT token.
        const { classTeacher } = req.user; // Assuming class teacher information is stored in the user object

        // Debugging: Log the class teacher of class value
        console.log("Class Teacher of :", classTeacher);

        // 2. Use aggregation to filter students who belong to the same class and have unverified emails.
        const newStudents = await User.aggregate([
            {
                $match: {
                    year: classTeacher[0].year, // Filter by year branch semester division
                    branch: classTeacher[0].branch,
                    semester: classTeacher[0].semester,
                    division: classTeacher[0].division,
                    role: "Student", // Filter by role
                    isEmailVerified: false // Filter by unverified email
                }
            },
            {
                $project: {
                    password: 0,
                    refreshToken: 0 // Exclude password and refreshToken fields from the results
                }
            }
        ]);

        console.log("Filtered Students:", newStudents);

        // 3. Return the filtered list of Students as the response.
        res.status(200).json({
            success: true,
            data: newStudents
        });
    } catch (error) {
        // Error handling: Log and send error response
        console.error("Error fetching new Students:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});

// Done
const acceptNewStudent = asyncHandler(async (req, res) => {
    try {
        const { studentId } = req.params;
        console.log(studentId);

        // Find the student by ID and update their status to accepted
        const student = await User.findByIdAndUpdate(
            studentId,
            {
                $set: { isEmailVerified: true }
            },
            { new: true }
        );

        if (!student) {
            throw new ApiError(404, "student not found");
        }
        // Send a notification email to the student's registered email address
        sendNewUserAcceptedEmail(student.email, student.role, student.name);

        res.status(200).json(new ApiResponse(200, student, "student accepted successfully"));
    } catch (error) {
        throw new ApiError(500, "Error accepting student");
    }
});

// Done
const studentBatchAllocation = asyncHandler(async (req, res) => {
    try {
        const { studentId } = req.params;
        const { batch } = req.body;

        // Find the student by ID and update their batch
        const student = await User.findByIdAndUpdate(
            studentId,
            { $set: { batch: batch, isBatchAllocated: true } },
            { new: true }
        );

        if (!student) {
            throw new ApiError(404, "Student not found");
        }

        res.status(200).json(new ApiResponse(200, student, "Student batch allocated successfully"));
    } catch (error) {
        throw new ApiError(500, "Error allocating student batch");
    }
});

// Done
const classTeacherAllocation = asyncHandler(async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { year, branch, semester, division } = req.body;

        // Find the teacher by ID and update their class teacher status
        const teacher = await Admin.findByIdAndUpdate(
            teacherId,
            {
                $set: {
                    classTeacher: [{
                        year: year,
                        branch: branch,
                        semester: semester,
                        division: division,
                    }],
                    isClassTeacher: true
                }
            },
            { new: true }
        );

        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }

        res.status(200).json(new ApiResponse(200, teacher, "Class teacher allocated successfully"));
    } catch (error) {
        throw new ApiError(500, "Error allocating class teacher");
    }
});

// allow user to change their academic details if the academic year is completed
const allowToChangeAcademicDetails = asyncHandler(async (req, res) => {
    try {
        // Assuming the user's ID is obtained from the request
        const userId = req.user._id;

        // Assuming you have a method to check if the academic year is completed for the user
        const isAcademicYearCompleted = await checkAcademicYearCompletion(userId);

        if (isAcademicYearCompleted) {
            return res.status(200).json(new ApiResponse(200, { allowChange: true }, "User can change academic details"));
        } else {
            return res.status(200).json(new ApiResponse(200, { allowChange: false }, "User cannot change academic details yet"));
        }
    } catch (error) {
        throw new ApiError(500, "Error checking academic year completion");
    }
});



export {
    registerAdmin,
    changeCurrentPassword,
    getCurrentAdmin,
    updateAccountDetails,
    updateAdminCode,
    getAdminCode,
    updateAdminProfilePhoto,
    forgetPassword,
    resetPassword,
    getCurrentAdminEssentials,

    getSubjectSwitchOptionList,

    newStudentList,
    newTeacherList,
    acceptNewStudent,
    acceptNewTeacher,
    studentBatchAllocation,
    classTeacherAllocation,
    allowToChangeAcademicDetails,

}