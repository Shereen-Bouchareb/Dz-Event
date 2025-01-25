// Middleware pour gérer l'upload de fichiers
//Ce middleware permet de gérer l'upload des images via multer, un package qui facilite l'upload de fichiers.
const multer = require('multer');
const path = require('path');

// Définir l'emplacement de stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/gallery');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier
  }
});

// Initialiser multer avec le stockage défini
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Seuls les fichiers image sont autorisés'));
    }
  }
});

module.exports = upload;
