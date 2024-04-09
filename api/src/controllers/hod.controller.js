import { HOD } from "../models/hod.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Done
const addEmail = asyncHandler(async (req, res) => {

    const { email, department } = req.body;

    //check if email already exists in the database
    let existing_email = await HOD.findOne({ email: email});
    let existing_department = await HOD.findOne({department: department });

    if (existing_email || existing_department) return res.status(400).json({ msg: "This Email or Department is already registered" })

    //create a new hod with given details and save it to the database
    const hod = new HOD({
        email: email.toLowerCase(),
        department: department
    });
    await hod.save();

    //send back a success response
    res.status(201).json({ msg: 'Email has been added' });
});

const updateEmail = asyncHandler(async (req, res) => {

    const { email, department } = req.body;

    const hod = await HOD.findOneAndUpdate({department:department}, { email:email }, { new: true });

    if (!hod) return res.status(404).json({ msg: "No HOD found with this Department!" });

    res.status(200).json(hod);
});

const getEmail = asyncHandler(async (req, res) => {

    const { department } = req.body;

    const hods = await HOD.find({ department });

    if (!hods || hods.length === 0) return res.status(404).json("No HODs Found!");

    res.status(200).json(new ApiResponse(200, hods, "HOD Record successfully"));
});

const deleteEmail = asyncHandler(async (req, res) => {

    const { department } = req.body;

    const hod = await HOD.deleteOne({ department });

    if (!hod) return res.status(404).json('No HOD found!');

    res.status(200).json('Deleted Successfully!')
});

export {
    addEmail,
    updateEmail,
    getEmail,
    deleteEmail
};