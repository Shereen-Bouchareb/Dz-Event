// Middleware pour gérer l'upload de fichiers
//Ce middleware permet de gérer l'upload des images via multer, un package qui facilite l'upload de fichiers.
const multer = require('multer');    //Importation du package multer, qui est utilisé pour gérer les fichiers téléchargés (upload) dans une application Node.js.
const path = require('path');   // Fournir un outil facile pour stocker et traiter les fichiers envoyés dans une requête HTTP.
  //Importation du module path, qui permet de manipuler les chemins de fichiers et d'ajouter/extraire leurs extensions.


// Définir l'emplacement de stockage des fichiers
const storage = multer.diskStorage({   //multer.diskStorage :Définit où et comment les fichiers téléchargés seront stockés sur le serveur.
  destination: (req, file, cb) => {  //destination : Une fonction pour spécifier l'emplacement de stockage des fichiers.
                                     //cb : Une fonction de rappel (callback) utilisée pour spécifier le chemin du dossier.
    cb(null, 'public/gallery');
  },
  filename: (req, file, cb) => {//req http //file le fichier telecharger //cb : Une fonction de rappel pour définir le nom final du fichier
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier //ajoutée l'extension originale du fichier via path.extname(file.originalname).
  }
});

// Initialiser multer avec le stockage défini
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());//extname : Vérifie si l'extension du fichier correspond à fileTypes.
    const mimetype = fileTypes.test(file.mimetype); //mimetype : Vérifie si le type MIME du fichier correspond à un type d'image (comme image/jpeg ou image/png).

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Seuls les fichiers image sont autorisés'));
    }
  }
});

module.exports = upload;
