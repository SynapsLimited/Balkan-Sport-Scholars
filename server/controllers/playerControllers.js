// controllers/playerControllers.js

const Player = require('../models/playerModel');
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

// ======================== Create a Player
// POST: /api/players
// PROTECTED
const createPlayer = async (req, res, next) => {
  try {
    const {
      name,
      clubname,
      dob,
      sex,
      sport,
      sport_en,
      position,
      position_en,
      nationality,
      nationality_en,
      height,
      weight,
      preferredFootHand,
      preferredFootHand_en,
      description,
      description_en,
      videoLink,
    } = req.body;

    if (!name) {
      return next(new HttpError('Name is required.', 422));
    }

    // Handle image upload
    let imageUrl = null;
    if (req.files['image']) {
      const imageBuffer = req.files['image'][0].buffer;
      const imageName = `players/images/${Date.now()}-${req.files['image'][0].originalname}`;
      imageUrl = await uploadToVercelBlob(imageBuffer, imageName);
    }

    // Handle documents upload
    let documentsUrls = [];
    if (req.files['documents']) {
      for (const file of req.files['documents']) {
        const fileBuffer = file.buffer;
        const fileName = `players/documents/${Date.now()}-${file.originalname}`;
        const fileUrl = await uploadToVercelBlob(fileBuffer, fileName);
        documentsUrls.push(fileUrl);
      }
    }

    const newPlayer = await Player.create({
      name,
      clubname,
      dob,
      sex,
      sport,
      sport_en,
      position,
      position_en,
      nationality,
      nationality_en,
      height,
      weight,
      preferredFootHand,
      preferredFootHand_en,
      description,
      description_en,
      videoLink,
      image: imageUrl,
      documents: documentsUrls,
      creator: req.user.id,
    });

    res.status(201).json(newPlayer);
  } catch (error) {
    return next(new HttpError(error.message || 'Something went wrong', 500));
  }
};

// ======================== Get all Players
// GET: /api/players
// UNPROTECTED
const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find().sort({ updatedAt: -1 });
    res.status(200).json(players);
  } catch (error) {
    return next(new HttpError(error.message || 'Failed to fetch players', 500));
  }
};

// ======================== Get single Player
// GET: /api/players/:id
// UNPROTECTED
const getPlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    if (!player) {
      return next(new HttpError('Player not found.', 404));
    }
    res.status(200).json(player);
  } catch (error) {
    return next(new HttpError('Player does not exist', 404));
  }
};

// ======================== Edit Player
// PATCH: /api/players/:id
// PROTECTED
const editPlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    const {
      name,
      clubname,
      dob,
      sex,
      sport,
      sport_en,
      position,
      position_en,
      nationality,
      nationality_en,
      height,
      weight,
      preferredFootHand,
      preferredFootHand_en,
      description,
      description_en,
      videoLink,
    } = req.body;

    if (!name) {
      return next(new HttpError('Name is required.', 422));
    }

    const oldPlayer = await Player.findById(playerId);
    if (!oldPlayer) {
      return next(new HttpError('Player not found.', 404));
    }

    // Handle image update
    let imageUrl = oldPlayer.image;
    if (req.files['image']) {
      const imageBuffer = req.files['image'][0].buffer;
      const imageName = `players/images/${Date.now()}-${req.files['image'][0].originalname}`;
      imageUrl = await uploadToVercelBlob(imageBuffer, imageName);

      // Delete old image
      if (oldPlayer.image) {
        await deleteFromVercelBlob(oldPlayer.image);
      }
    }

    // Handle documents update
    let documentsUrls = oldPlayer.documents;
    if (req.files['documents']) {
      // Delete old documents
      if (oldPlayer.documents && oldPlayer.documents.length > 0) {
        for (const docUrl of oldPlayer.documents) {
          await deleteFromVercelBlob(docUrl);
        }
      }

      // Upload new documents
      documentsUrls = [];
      for (const file of req.files['documents']) {
        const fileBuffer = file.buffer;
        const fileName = `players/documents/${Date.now()}-${file.originalname}`;
        const fileUrl = await uploadToVercelBlob(fileBuffer, fileName);
        documentsUrls.push(fileUrl);
      }
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      {
        name,
        clubname,
        dob,
        sex,
        sport,
        sport_en,
        position,
        position_en,
        nationality,
        nationality_en,
        height,
        weight,
        preferredFootHand,
        preferredFootHand_en,
        description,
        description_en,
        videoLink,
        image: imageUrl,
        documents: documentsUrls,
      },
      { new: true }
    );

    res.status(200).json(updatedPlayer);
  } catch (error) {
    return next(new HttpError(error.message || "Couldn't update player", 500));
  }
};

// ======================== Delete Player
// DELETE: /api/players/:id
// PROTECTED
const deletePlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    if (!playerId) {
      return next(new HttpError('Player unavailable.', 400));
    }

    // Find the player by ID
    const player = await Player.findById(playerId);
    if (!player) {
      return next(new HttpError('Player not found.', 404));
    }

    // Delete image
    if (player.image) {
      await deleteFromVercelBlob(player.image);
    }

    // Delete documents
    if (player.documents && player.documents.length > 0) {
      for (const docUrl of player.documents) {
        await deleteFromVercelBlob(docUrl);
      }
    }

    // Delete the player from the database
    await Player.findByIdAndDelete(playerId);

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    return next(new HttpError("Couldn't delete player.", 400));
  }
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
  editPlayer,
  deletePlayer,
};
