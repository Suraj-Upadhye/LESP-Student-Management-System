import { asyncHandler } from "../utils/asyncHandler";


const login = asyncHandler( async( req, res) =>{
    const { email, password } = req.body;
    if(!email || !password ) return res.status(400).json({ message: 'Please provide an email and a password' });
    
})