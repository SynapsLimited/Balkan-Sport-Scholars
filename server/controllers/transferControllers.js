const Transfer = require('../models/transferModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

const { put } = require('@vercel/blob');
const multer = require('multer');

// Helper functions for Vercel Blob storage

const uploadToVercelBlob = async (fileBuffer, fileName) => {
  try {
    // Upload the file buffer to Vercel Blob storage
    const { url } = await put(fileName, fileBuffer, {
      access: 'public', // Ensure the file is publicly accessible
      token: process.env.BLOB_READ_WRITE_TOKEN, // Token with read/write access
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`, // Add Vercel API token
      },
    });

    // Log the success and return the URL
    console.log('Uploaded successfully to Vercel Blob:', url);
    return url; // Return the public URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    throw new Error('Failed to upload file to Vercel Blob');
  }
};

const deleteFromVercelBlob = async (fileUrl) => {
    try {
      if (!fileUrl) {
        console.log('No file to delete.');
        return;
      }
  
      const fileName = fileUrl.split('/').pop(); // Extract file name from URL
      const response = await fetch(`https://api.vercel.com/v2/blob/files/${fileName}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`, // Vercel API token for authorization
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete from Vercel Blob Storage');
      }
  
      console.log(`Deleted successfully from Vercel Blob: ${fileName}`);
    } catch (error) {
      console.error('Error deleting file from Vercel Blob:', error);
    }
  };
  

// ======================== Create a transfer
// POST : api/transfers
// PROTECTED
const createTransfer = async (req, res, next) => {
  try {
    const { fullName, previousClub, currentClub, description, description_en, youtubeLink } = req.body;

    if (!fullName || !previousClub || !currentClub || !description || !youtubeLink || !req.file) {
      return next(new HttpError('Fill in all fields and choose an image.', 422));
    }

    const imageBuffer = req.file.buffer;
    const fileName = `transfers/${Date.now()}-${req.file.originalname}`;

    const imageUrl = await uploadToVercelBlob(imageBuffer, fileName);

    const newTransfer = await Transfer.create({
      fullName,
      previousClub,
      currentClub,
      description,
      description_en,
      youtubeLink,
      image: imageUrl,
      creator: req.user.id,
    });

    if (!newTransfer) {
      return next(new HttpError("Transfer couldn't be created", 422));
    }

    res.status(201).json(newTransfer);
  } catch (error) {
    return next(new HttpError(error.message || 'Something went wrong', 500));
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
    return next(new HttpError(error.message || 'Something went wrong', 500));
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
      return next(new HttpError('Transfer not found.', 404));
    }
    res.status(200).json(transfer);
  } catch (error) {
    return next(new HttpError('Transfer does not exist', 404));
  }
};

// ======================== Edit transfer
// PATCH : api/transfers/:id
// PROTECTED
const editTransfer = async (req, res, next) => {
  try {
    const transferId = req.params.id;
    const { fullName, previousClub, currentClub, description, description_en, youtubeLink } = req.body;

    if (!fullName || !previousClub || !currentClub || !description || !youtubeLink) {
      return next(new HttpError('Fill in all fields.', 422));
    }

    // Get old transfer from database
    const oldTransfer = await Transfer.findById(transferId);
    if (!oldTransfer) {
      return next(new HttpError('Transfer not found.', 404));
    }

    let newImageUrl = oldTransfer.image;

    if (req.file) {
      const imageBuffer = req.file.buffer;
      const fileName = `transfers/${Date.now()}-${req.file.originalname}`;
      newImageUrl = await uploadToVercelBlob(imageBuffer, fileName);

      if (oldTransfer.image) {
        await deleteFromVercelBlob(oldTransfer.image);
      }
    }

    const updatedTransfer = await Transfer.findByIdAndUpdate(
      transferId,
      {
        fullName,
        previousClub,
        currentClub,
        description,
        description_en,
        youtubeLink,
        image: newImageUrl,
      },
      { new: true }
    );

    if (!updatedTransfer) {
      return next(new HttpError("Couldn't update transfer", 400));
    }

    res.status(200).json(updatedTransfer);
  } catch (error) {
    return next(new HttpError(error.message || 'Something went wrong', 500));
  }
};

// ======================== Delete transfer
// DELETE : api/transfers/:id
// PROTECTED
const deleteTransfer = async (req, res, next) => {
  try {
    const transferId = req.params.id;
    if (!transferId) {
      return next(new HttpError('Transfer unavailable.', 400));
    }
    const transfer = await Transfer.findById(transferId);
    if (!transfer) {
      return next(new HttpError('Transfer not found.', 404));
    }

    // Attempt to delete the image from Vercel Blob storage
    if (transfer.image) {
      await deleteFromVercelBlob(transfer.image);
    }

    await Transfer.findByIdAndDelete(transferId);
    res.status(200).json({ message: 'Transfer deleted successfully' });
  } catch (error) {
    return next(new HttpError("Couldn't delete transfer.", 400));
  }
};

module.exports = { createTransfer, getTransfers, getTransfer, editTransfer, deleteTransfer };
