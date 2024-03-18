import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


// cloudinary.config({ 
//   cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
//   api_key: `${process.env.CLOUDINARY_API_KEY}`, 
//   api_secret: `${process.env.CLOUDINARY_API_SECRET}` 
// });


cloudinary.config({ 
  cloud_name: 'dk5cr6qga', 
  api_key: '435269349542857', 
  api_secret: 'ocVLVlmcXoPZhhPw7MexyB7nZWg' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("in uploadCloudinary :",localFilePath);
        // if (!localFilePath) {
        //     console.log("error");
        //     return "null";
        // }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // upload the file on cloudinary
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log("Error",error)
        return "null not uploading";
    }
}



export {uploadOnCloudinary}