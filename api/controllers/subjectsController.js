import Subjects from '../models/Subjects.js';
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";


export const addSubjects = async (req, res, next) =>{
 
    try {
        const  subject = new Subjects(req.body);
        const subjectdoc = await Subjects.findOne({})
        console.log(subjectdoc)
        await subject.save();
        console.log(req.body);
         
         // console.log('subject', subject);
          return res.status(200).json(CreateSuccess(200,"Subject Added Successfully"));  
    } catch (error) {
        console.error(error);
    return res.status(500).json(CreateError(500, "Internal Server Error")); 
    }
};


export const getSubjectBy = async (req, res, next) =>{
    try {
        // req.body.
        const subject = await Subjects.findOne({'Subjects.Computer_Engineering.':req.body});
    } catch (error) {
        console.error(error);
        return res.status(500).json(CreateError(500, "Internal Server Error")); 
    }
}
