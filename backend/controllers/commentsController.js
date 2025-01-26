const userQueries = require('../models/commentsModel');
// TODO : different exported functions 

exports.getPrestataireComments = async (req, res) => {
    try {
        const  prestataire_id  = req.user.id;
        const comments = await userQueries.getPrestataireComments(prestataire_id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};