const Player = require('../models/playerModel');
const HttpError = require('../models/errorModel');
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');




// ======================== Create a Player
// POST : api/players
// PROTECTED
const createPlayer = async (req, res, next) => {
    try {
        let { name, clubname, dob, sex, sport, position, nationality, height, weight, preferredFootHand, description, videoLink } = req.body;
        if (!name || !clubname || !dob || !sex || !sport || !position || !nationality || !height || !weight || !preferredFootHand || !description || !req.files) {
            return next(new HttpError("Fill in all fields and upload the image and documents.", 422));
        }
        
        const { image, documents } = req.files;

        // Validate image size
        if (image.size > 10000000) {
            return next(new HttpError("Image too big. File should be less than 10MB"));
        }

        // Process image file
        let imageName = uuid() + path.extname(image.name);
        image.mv(path.join(__dirname, '..', '/uploads', imageName), (err) => {
            if (err) {
                return next(new HttpError(err));
            }
        });

        // Process document files
        let documentPaths = [];
        if (documents) {
            documents.forEach(doc => {
                let docName = uuid() + path.extname(doc.name);
                doc.mv(path.join(__dirname, '..', '/uploads', docName), (err) => {
                    if (err) {
                        return next(new HttpError(err));
                    }
                });
                documentPaths.push(docName);
            });
        }

        // Create new player
        const newPlayer = await Player.create({
            name, clubname, dob, sex, sport, position, nationality, height, weight, preferredFootHand, description, videoLink, image: imageName, documents: documentPaths
        });

        if (!newPlayer) {
            return next(new HttpError("Player couldn't be created", 422));
        }

        res.status(201).json(newPlayer);
    } catch (error) {
        return next(new HttpError(error));
    }
};

// ======================== Get all Players
// GET : api/players
// UNPROTECTED
const getPlayers = async (req, res, next) => {
    try {
        const players = await Player.find().sort({ updatedAt: -1 });
        res.status(200).json(players);
    } catch (error) {
        return next(new HttpError(error));
    }
};

// ======================== Get single Player
// GET : api/players/:id
// UNPROTECTED
const getPlayer = async (req, res, next) => {
    try {
        const playerId = req.params.id;
        const player = await Player.findById(playerId);
        if (!player) {
            return next(new HttpError("Player not found.", 404));
        }
        res.status(200).json(player);
    } catch (error) {
        return next(new HttpError("Player does not exist", 404));
    }
};

// ======================== Edit Player
// PATCH : api/players/:id
// PROTECTED
const editPlayer = async (req, res, next) => {
    try {
        let { name, clubname, dob, sex, sport, position, nationality, height, weight, preferredFootHand, description, videoLink } = req.body;
        const playerId = req.params.id;

        if (!name || !clubname || !dob || !sex || !sport || !position || !nationality || !height || !weight || !preferredFootHand || !description) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const player = await Player.findById(playerId);
        if (!player) {
            return next(new HttpError("Player not found.", 404));
        }

        // Handle image and documents if they are uploaded
        let updatedData = { name, clubname, dob, sex, sport, position, nationality, height, weight, preferredFootHand, description, videoLink };
        
        if (req.files) {
            const { image, documents } = req.files;

            // Process image if it is uploaded
            if (image) {
                if (image.size > 2000000) {
                    return next(new HttpError("Image too big. Should be less than 2MB"));
                }

                // Delete old image
                const oldImagePath = path.join(__dirname, '..', 'uploads', player.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }

                let imageName = uuid() + path.extname(image.name);
                image.mv(path.join(__dirname, '..', '/uploads', imageName));
                updatedData.image = imageName;
            }

            // Process documents if they are uploaded
            if (documents) {
                let documentPaths = [];

                // Delete old documents
                player.documents.forEach(doc => {
                    const oldDocPath = path.join(__dirname, '..', 'uploads', doc);
                    if (fs.existsSync(oldDocPath)) {
                        fs.unlinkSync(oldDocPath);
                    }
                });

                documents.forEach(doc => {
                    let docName = uuid() + path.extname(doc.name);
                    doc.mv(path.join(__dirname, '..', '/uploads', docName));
                    documentPaths.push(docName);
                });

                updatedData.documents = documentPaths;
            }
        }

        const updatedPlayer = await Player.findByIdAndUpdate(playerId, updatedData, { new: true });

        if (!updatedPlayer) {
            return next(new HttpError("Couldn't update player", 400));
        }

        res.status(200).json(updatedPlayer);

    } catch (error) {
        return next(new HttpError(error));
    }
};

// ======================== Delete Player
// DELETE : api/players/:id
// PROTECTED
const deletePlayer = async (req, res, next) => {
    try {
        const playerId = req.params.id;
        if (!playerId) {
            return next(new HttpError("Player unavailable.", 400));
        }

        const player = await Player.findById(playerId);
        if (!player) {
            return next(new HttpError("Player not found.", 404));
        }

        // Delete image
        const imagePath = path.join(__dirname, '..', 'uploads', player.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete documents
        player.documents.forEach(doc => {
            const docPath = path.join(__dirname, '..', 'uploads', doc);
            if (fs.existsSync(docPath)) {
                fs.unlinkSync(docPath);
            }
        });

        await Player.findByIdAndDelete(playerId);

        res.status(200).json({ message: 'Player deleted successfully' });

    } catch (error) {
        return next(new HttpError("Couldn't delete player.", 400));
    }
};

module.exports = { createPlayer, getPlayers, getPlayer, editPlayer, deletePlayer };
