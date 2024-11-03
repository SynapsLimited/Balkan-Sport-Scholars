// controllers/playerControllers.js

const Player = require('../models/playerModel');
const HttpError = require('../models/errorModel'); // Custom error model
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

    const parsedUrl = new URL(fileUrl);
    const pathname = parsedUrl.pathname;
    const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);

    console.log(`Deleting file: ${fileName}`);

    const response = await fetch(`https://api.vercel.com/v2/blob/files/${fileName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Vercel Blob DELETE Error: ${response.status} - ${errorText}`);
      throw new Error(`Failed to delete from Vercel Blob Storage: ${response.statusText}`);
    }

    console.log(`Deleted successfully from Vercel Blob: ${fileName}`);
  } catch (error) {
    console.error('Error deleting file from Vercel Blob:', error);
    throw new Error('Failed to delete file from Vercel Blob');
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

    // Validation: Name is required
    if (!name) {
      return next(new HttpError('Name is required.', 422));
    }

    // Handle image upload
    let imageUrl = null;
    if (req.files['image'] && req.files['image'][0]) {
      const imageBuffer = req.files['image'][0].buffer;
      const imageName = `players/images/${Date.now()}-${req.files['image'][0].originalname}`;
      imageUrl = await uploadToVercelBlob(imageBuffer, imageName);
    }

    // Handle documents upload
    let documentNames = [];
    let documentNames_en = [];
    let documentUrls = [];

    if (req.files['documents']) {
      const documentFiles = req.files['documents'];
      let names = req.body.documentNames;
      let namesEn = req.body.documentNames_en;

      // Normalize to arrays
      names = Array.isArray(names) ? names : [names];
      namesEn = Array.isArray(namesEn) ? namesEn : [namesEn];

      // Validation: Ensure names arrays match files count
      if (names.length !== documentFiles.length || namesEn.length !== documentFiles.length) {
        return next(new HttpError('Number of document names does not match number of documents.', 422));
      }

      // Validation: Limit to 10 documents
      if (documentFiles.length > 10) {
        return next(new HttpError('Cannot upload more than 10 documents.', 422));
      }

      // Upload each document
      for (let i = 0; i < documentFiles.length; i++) {
        const file = documentFiles[i];
        const name = names[i].trim() || file.originalname;
        const nameEn = namesEn[i].trim() || '';

        if (!name) {
          return next(new HttpError(`Document name at index ${i} is empty.`, 422));
        }

        const fileBuffer = file.buffer;
        const fileName = `players/documents/${Date.now()}-${file.originalname}`;
        const fileUrl = await uploadToVercelBlob(fileBuffer, fileName);

        documentNames.push(name);
        documentNames_en.push(nameEn);
        documentUrls.push(fileUrl);
      }
    }

    // Create the new player
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
      documentNames,
      documentNames_en,
      documentUrls,
      creator: req.user.id, // Assuming authMiddleware sets req.user
    });

    // Logging the newly created player
    console.log('New Player Created:', newPlayer);

    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Error in createPlayer:', error);
    return next(new HttpError(error.message || 'Something went wrong', 500));
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
      removeDocuments, // Array of URLs to remove
    } = req.body;

    // Validation: Name is required
    if (!name) {
      return next(new HttpError('Name is required.', 422));
    }

    // Fetch the existing player
    const oldPlayer = await Player.findById(playerId);
    if (!oldPlayer) {
      return next(new HttpError('Player not found.', 404));
    }

    // Handle image update
    let imageUrl = oldPlayer.image;
    if (req.files['image'] && req.files['image'][0]) {
      const imageBuffer = req.files['image'][0].buffer;
      const imageName = `players/images/${Date.now()}-${req.files['image'][0].originalname}`;
      imageUrl = await uploadToVercelBlob(imageBuffer, imageName);

      // Delete old image from Vercel Blob
      if (oldPlayer.image) {
        await deleteFromVercelBlob(oldPlayer.image);
      }
    }

    // Initialize documents arrays
    let documentNames = [...oldPlayer.documentNames];
    let documentNames_en = [...oldPlayer.documentNames_en];
    let documentUrls = [...oldPlayer.documentUrls];

    // Handle document removals
    if (removeDocuments && Array.isArray(removeDocuments)) {
      for (const url of removeDocuments) {
        const index = documentUrls.indexOf(url);
        if (index !== -1) {
          // Delete from Vercel Blob
          await deleteFromVercelBlob(url);
          // Remove from arrays
          documentNames.splice(index, 1);
          documentNames_en.splice(index, 1);
          documentUrls.splice(index, 1);
        }
      }
    }

    // Handle new documents upload
    if (req.files['documents']) {
      const documentFiles = req.files['documents'];
      let names = req.body.documentNames;
      let namesEn = req.body.documentNames_en;

      // Normalize to arrays
      names = Array.isArray(names) ? names : [names];
      namesEn = Array.isArray(namesEn) ? namesEn : [namesEn];

      // Validation: Ensure names arrays match files count
      if (names.length !== documentFiles.length || namesEn.length !== documentFiles.length) {
        return next(new HttpError('Number of document names does not match number of documents.', 422));
      }

      // Validation: Ensure total documents do not exceed 10
      if (documentUrls.length + documentFiles.length > 10) {
        return next(new HttpError('Cannot have more than 10 documents.', 422));
      }

      // Upload each new document
      for (let i = 0; i < documentFiles.length; i++) {
        const file = documentFiles[i];
        const name = names[i].trim() || file.originalname;
        const nameEn = namesEn[i].trim() || '';

        if (!name) {
          return next(new HttpError(`Document name at index ${i} is empty.`, 422));
        }

        const fileBuffer = file.buffer;
        const fileName = `players/documents/${Date.now()}-${file.originalname}`;
        const fileUrl = await uploadToVercelBlob(fileBuffer, fileName);

        documentNames.push(name);
        documentNames_en.push(nameEn);
        documentUrls.push(fileUrl);
      }
    }

    // Update the player with new data
    oldPlayer.name = name;
    oldPlayer.clubname = clubname;
    oldPlayer.dob = dob;
    oldPlayer.sex = sex;
    oldPlayer.sport = sport;
    oldPlayer.sport_en = sport_en;
    oldPlayer.position = position;
    oldPlayer.position_en = position_en;
    oldPlayer.nationality = nationality;
    oldPlayer.nationality_en = nationality_en;
    oldPlayer.height = height;
    oldPlayer.weight = weight;
    oldPlayer.preferredFootHand = preferredFootHand;
    oldPlayer.preferredFootHand_en = preferredFootHand_en;
    oldPlayer.description = description;
    oldPlayer.description_en = description_en;
    oldPlayer.videoLink = videoLink;
    oldPlayer.image = imageUrl;
    oldPlayer.documentNames = documentNames;
    oldPlayer.documentNames_en = documentNames_en;
    oldPlayer.documentUrls = documentUrls;

    // Save the updated player
    const updatedPlayer = await oldPlayer.save();

    // Logging the updated player
    console.log('Player Updated:', updatedPlayer);

    res.status(200).json(updatedPlayer);
  } catch (error) {
    console.error('Error in editPlayer:', error);
    return next(new HttpError(error.message || "Couldn't update player", 500));
  }
};

// ======================== Delete Player
// DELETE: /api/players/:id
// PROTECTED
// controllers/playerControllers.js

const deletePlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    console.log(`Attempting to delete player with ID: ${playerId}`);

    if (!playerId) {
      console.log('No player ID provided.');
      return next(new HttpError('Player unavailable.', 400));
    }

    // Find the player by ID
    const player = await Player.findById(playerId);
    if (!player) {
      console.log(`Player with ID ${playerId} not found.`);
      return next(new HttpError('Player not found.', 404));
    }

    console.log(`Player found: ${player.name}`);

    // Delete image
    if (player.image) {
      console.log(`Deleting image: ${player.image}`);
      try {
        await deleteFromVercelBlob(player.image);
        console.log('Image deleted successfully.');
      } catch (imageError) {
        console.error('Error deleting image from Vercel Blob:', imageError);
        return next(new HttpError('Failed to delete player image.', 400));
      }
    } else {
      console.log('No image to delete.');
    }

    // Delete documents
    if (player.documentUrls && player.documentUrls.length > 0) {
      for (let url of player.documentUrls) {
        if (url) {
          console.log(`Deleting document: ${url}`);
          try {
            await deleteFromVercelBlob(url);
            console.log('Document deleted successfully.');
          } catch (docError) {
            console.error('Error deleting document from Vercel Blob:', docError);
            return next(new HttpError('Failed to delete player documents.', 400));
          }
        }
      }
    } else {
      console.log('No documents to delete.');
    }

    // Delete the player from the database
    await Player.findByIdAndDelete(playerId);
    console.log(`Player with ID ${playerId} deleted successfully.`);

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error in deletePlayer:', error);
    return next(new HttpError("Couldn't delete player.", 400));
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
    console.error('Error in getPlayer:', error);
    return next(new HttpError('Player does not exist', 404));
  }
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
  editPlayer,
  deletePlayer,
};
