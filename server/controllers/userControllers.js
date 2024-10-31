const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require("uuid")


const User = require('../models/userModel')
const HttpError = require("../models/errorModel")

// Define allowed emails
const allowedEmails = [
    "rahmaniendi26@gmail.com",
    "bujar@synapslimited.eu",
];



// ======================= Register a new User
// POST : api/users/register
//UNPROTECTED

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password || !password2) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const newEmail = email.toLowerCase();

         // Check if the email is in the allowed list
         if (!allowedEmails.includes(newEmail)) {
            return next(new HttpError("Not authorized to register. Contact Synaps!", 422));
        }

        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return next(new HttpError("Email already exists.", 422));
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters.", 422));
        }

        if (password !== password2) {
            return next(new HttpError("Passwords do not match.", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass });
        res.status(201).json(`New User ${newUser.email} registered.`);
    } catch (error) {
        console.error("Registration Error:", error);
        return next(new HttpError("User Registration failed.", 422));
    }
};


// ======================= Login a registered User
// POST : api/users/login
//UNPROTECTED

const loginUser = async (req, res, next) => {
    try {
        console.log("Raw request body received:", req.body); // Debugging log

        // Trim the values to remove any leading/trailing whitespaces or newlines
        const email = req.body.email ? req.body.email.trim() : '';
        const password = req.body.password ? req.body.password.trim() : '';

        if (!email || !password) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, id, name });
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials.", 422));
    }
};



// ======================= User Profile
// POST : api/users/:id
//UNPROTECTED

const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if(!user) {
            return next(new HttpError("User not found.", 404))
        }
            res.status(200).json(user);
    }   catch (error) {
        return next(new HttpError(error))
    }
}


// ======================= Change User Avatar (profile picture)
// POST : api/users/change-avatar
//UNPROTECTED

const changeAvatar = async (req, res, next) => {
    try {
        console.log("Received request files:", req.files); // Log the received files

        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422));
        }

        // find user from database
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found.", 404));
        }

        // delete old avatar if exists
        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if (err) {
                    return next(new HttpError(err));
                }
            });
        }

        const { avatar } = req.files;

        // check file size
        if (avatar.size > 2000000) {
            return next(new HttpError("Profile picture too big. Should be less than 2MB", 422));
        }

        let fileName = avatar.name;
        let splittedFilename = fileName.split('.');
        let newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;
        
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err));
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true });
            if (!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed", 422));
            }
            res.status(200).json(updatedAvatar);
        });
    } catch (error) {
        return next(new HttpError(error));
    }
};



// ======================= Edit User Details (from profile)
// POST : api/users/edit-user
//UNPROTECTED

const editUser = async (req, res, next) => {
    try {
        const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body;
        if(!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("Fill in all fields", 422))
        }

        // get user from database
        const user = await User.findById(req.user.id);
        if(!user) {
            return next(new HttpError("User not found", 403))
        }


        //make sure new email doesn't already exist
        const emailExist = await User.findOne({email});

        if(emailExist && (emailExist._id != req.user.id)) {
            return next(new HttpError("Email already exist.", 422))
        }

        // compare current password to db password
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
            if(!validateUserPassword) {
                return next(new HttpError("Invalid current password.", 422))
            }

        //compare new passwords
        if(newPassword !== confirmNewPassword) {
            return next(new HttpError("New passwords do not match.", 422))
        }

        //hash new password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt);

        //update user info in database
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
        res.status(200).json(newInfo)

    } catch (error) {
        return next(new HttpError(error))
    }
}


// ======================= Get Authors
// POST : api/users/authors
//UNPROTECTED

const getAuthors = async (req, res, next) => {
    try {
        // Fetch authors from the database, excluding the password field
        const authors = await User.find().select('-password');
        
        // Send the authors as a JSON response
        res.json(authors);
    } catch (error) {
        // Log the error (optional, but useful for debugging)
        console.error('Error fetching authors:', error);

        // Create a new error object with a custom message and status code
        const httpError = new HttpError('Fetching authors failed, please try again later.', 500);

        // Pass the error to the next middleware (usually an error handling middleware)
        return next(httpError);
    }
}




module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors }