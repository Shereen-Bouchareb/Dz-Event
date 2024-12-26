const userQueries = require('../models/commentsModel');
// TODO : different exported functions 

exports.getPrestataireComments = async (req, res) => {
    try {
        const prestataireId = req.params.prestataireId;
        const comments = await commentsModel.getCommentsByPrestataireId(prestataireId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};