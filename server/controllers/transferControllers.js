// controllers/transferControllers.js

const Transfer = require('../models/transferModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const { put } = require('@vercel/blob'); // Vercel Blob storage
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // For node-fetch

// Helper function to upload files to Vercel Blob
const uploadToVercelBlob = async (fileBuffer, fileName) => {
  try {
    const { url } = await put(fileName, fileBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      },
    });
    console.log('Uploaded successfully to Vercel Blob:', url);
    return url;
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    throw new Error('Failed to upload file to Vercel Blob');
  }
};

// Helper function to delete files from Vercel Blob
const deleteFromVercelBlob = async (fileUrl) => {
  try {
    if (!fileUrl) {
      console.log('No file to delete.');
      return;
    }

    const fileName = fileUrl.split('/').pop();
    const response = await fetch(`https://api.vercel.com/v2/blob/files/${fileName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
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

// ======================== Create a Transfer
// POST: /api/transfers
// PROTECTED
const createTransfer = async (req, res, next) => {
  try {
    const { fullName, previousClub, currentClub, description, description_en, youtubeLink } = req.body;

    if (!fullName) {
      return next(new HttpError('Full Name is required.', 422));
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const imageName = `transfers/images/${Date.now()}-${req.file.originalname}`;
      imageUrl = await uploadToVercelBlob(imageBuffer, imageName);
    }

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

    res.status(201).json(newTransfer);
  } catch (error) {
    return next(new HttpError(error.message || 'Something went wrong', 500));
  }
};

// ======================== Get all Transfers
// GET: /api/transfers
// UNPROTECTED
const getTransfers = async (req, res, next) => {
  try {
    const transfers = await Transfer.find().sort({ updatedAt: -1 });
    res.status(200).json(transfers);
  } catch (error) {
    return next(new HttpError(error.message || 'Failed to fetch transfers', 500));
  }
};

// ======================== Get single Transfer
// GET: /api/transfers/:id
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

// ======================== Edit Transfer
// PATCH: /api/transfers/:id
// PROTECTED
const editTransfer = async (req, res, next) => {
  try {
    const transferId = req.params.id;
    const { fullName, previousClub, currentClub, description, description_en, youtubeLink } = req.body;

    if (!fullName) {
      return next(new HttpError('Full Name is required.', 422));
    }

    const oldTransfer = await Transfer.findById(transferId);
    if (!oldTransfer) {
      return next(new HttpError('Transfer not found.', 404));
    }

    // Handle image update
    let imageUrl = oldTransfer.image;
    if (req.file) {
      const imageBuffer = req.file.buffer;
      const imageName = `transfers/images/${Date.now()}-${req.file.originalname}`;
      imageUrl = await uploadToVercelBlob(imageBuffer, imageName);

      // Delete old image
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
        image: imageUrl,
      },
      { new: true }
    );

    res.status(200).json(updatedTransfer);
  } catch (error) {
    return next(new HttpError(error.message || "Couldn't update transfer", 500));
  }
};

// ======================== Delete Transfer
// DELETE: /api/transfers/:id
// PROTECTED
const deleteTransfer = async (req, res, next) => {
  try {
    const transferId = req.params.id;
    if (!transferId) {
      return next(new HttpError('Transfer unavailable.', 400));
    }

    // Find the transfer by ID
    const transfer = await Transfer.findById(transferId);
    if (!transfer) {
      return next(new HttpError('Transfer not found.', 404));
    }

    // Delete image
    if (transfer.image) {
      await deleteFromVercelBlob(transfer.image);
    }

    // Delete the transfer from the database
    await Transfer.findByIdAndDelete(transferId);

    res.status(200).json({ message: 'Transfer deleted successfully' });
  } catch (error) {
    return next(new HttpError("Couldn't delete transfer.", 400));
  }
};

module.exports = {
  createTransfer,
  getTransfers,
  getTransfer,
  editTransfer,
  deleteTransfer,
};
