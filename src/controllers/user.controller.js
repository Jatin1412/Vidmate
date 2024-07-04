import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async (req, res) => {
    const {email, fullName, userName, password} = req.body;
    
// check for empty field    
    if (
        [email, fullName, userName, password].some((fields) => fields?.trim() === "")
    ) {
       throw new ApiError(400, "All fields are required.");
    }

// check for existed username and email
    const existedUser = await User.findOne({
        $or : [{ userName }, { email }],
    })

    if (existedUser) {
        throw new ApiError(409, "Username and email is alredy existed.");
    }

// check for cover is uploaded sucesfully 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required"); 
    }

// Upload on cloudianry 

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

// Create user object

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

// find user by id and exclude password and refreshToken
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
// check for if user not creted  
    if (!createdUser) {
        throw new ApiError(500, "Something went worng while Registering...");
    }
 
// Return Resposnse
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    );
})

export {registerUser}