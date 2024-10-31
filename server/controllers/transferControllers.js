const Transfer = require('../models/transferModel');
const User = require("../models/userModel");
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const HttpError = require('../models/errorModel');

// ======================== Create a transfer
// POST : api/transfers
// PROTECTED
const createTransfer = async (req, res, next) => {
    try {
        const { fullName, previousClub, currentClub, description, youtubeLink } = req.body;
        if (!fullName || !previousClub || !currentClub || !description || !youtubeLink || !req.files) {
            return next(new HttpError("Fill in all fields and choose an image.", 422));
        }
        const { image } = req.files;

        // check the file size
        if (image.size > 2000000) {
            return next(new HttpError("Image too big. File should be less than 2MB"));
        }

        let fileName = image.name;
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
        image.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                const newTransfer = await Transfer.create({
                    fullName,
                    previousClub,
                    currentClub,
                    description,
                    youtubeLink,
                    image: newFilename,
                    creator: req.user.id
                });
                if (!newTransfer) {
                    return next(new HttpError("Transfer couldn't be created", 422));
                }

                res.status(201).json(newTransfer);
            }
        });

    } catch (error) {
        return next(new HttpError(error));
    }
};

// ======================== Get all transfers
// GET : api/transfers
// UNPROTECTED
const getTransfers = async (req, res, next) => {
    try {
        const transfers = await Transfer.find().sort({ updatedAt: -1 });
        res.status(200).json(transfers);
    } catch (error) {
        return next(new HttpError(error));
    }
};

// ======================== Get single transfer
// GET : api/transfers/:id
// UNPROTECTED
const getTransfer = async (req, res, next) => {
    try {
        const transferId = req.params.id;
        const transfer = await Transfer.findById(transferId);
        if (!transfer) {
            return next(new HttpError("Transfer not found.", 404));
        }
        res.status(200).json(transfer);
    } catch (error) {
        return next(new HttpError("Transfer does not exist", 404));
    }
};

// ======================== Edit transfer
// PATCH : api/transfers/:id
// PROTECTED
const editTransfer = async (req, res, next) => {
    try {
        let fileName;
        let newFilename;
        let updatedTransfer;
        const transferId = req.params.id;
        const { fullName, previousClub, currentClub, description, youtubeLink } = req.body;

        if (!fullName || !previousClub || !currentClub || description.length < 12 || !youtubeLink) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        // get old transfer from database
        const oldTransfer = await Transfer.findById(transferId);
        if (!oldTransfer) {
            return next(new HttpError("Transfer not found.", 404));
        }

        if (!req.files) {
            updatedTransfer = await Transfer.findByIdAndUpdate(transferId, {
                fullName,
                previousClub,
                currentClub,
                description,
                youtubeLink
            }, { new: true });
        } else {
            // delete old image from upload if it exists
            const oldImagePath = path.join(__dirname, '..', 'uploads', oldTransfer.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        return next(new HttpError(`Error deleting old image: ${err.message}`, 500));
                    }
                });
            }

            // upload new image
            const { image } = req.files;
            // check file size
            if (image.size > 2000000) {
                return next(new HttpError("Image too big. Should be less than 2MB"));
            }
            fileName = image.name;
            let splittedFilename = fileName.split('.');
            newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
            image.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                if (err) {
                    return next(new HttpError(err));
                }
            });

            updatedTransfer = await Transfer.findByIdAndUpdate(transferId, {
                fullName,
                previousClub,
                currentClub,
                description,
                youtubeLink,
                image: newFilename
            }, { new: true });
        }

        if (!updatedTransfer) {
            return next(new HttpError("Couldn't update transfer", 400));
        }

        res.status(200).json(updatedTransfer);

    } catch (error) {
        return next(new HttpError(error));
    }
};

// ======================== Delete transfer
// DELETE : api/transfers/:id
// PROTECTED
const deleteTransfer = async (req, res, next) => {
    try {
        const transferId = req.params.id;
        if (!transferId) {
            return next(new HttpError("Transfer unavailable.", 400));
        }
        const transfer = await Transfer.findById(transferId);
        const fileName = transfer?.image;
        // delete image from uploads folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                await Transfer.findByIdAndDelete(transferId);
                res.status(200).json({ message: "Transfer deleted successfully" });
            }
        });

    } catch (error) {
        return next(new HttpError("Couldn't delete transfer.", 400));
    }
};

module.exports = { createTransfer, getTransfers, getTransfer, editTransfer, deleteTransfer };
