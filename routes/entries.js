const router = require('express').Router();
const pool = require('../db')
const authorization = require('../middleware/authorization')

router.post('/', authorization, async (req, res) => {
    try {
        const { content, emotion, flagged, notes } = req.body;
        const entry = await pool.query(
            "INSERT INTO article (content, emotion, flagged, notes, user_id) VALUES ($1, $2, $3, $4, $5)", [content, emotion, flagged, notes, req.user])
        res.status(201).json('Entry added successfully')
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error');

    }
})

router.get('/', authorization, async (req, res) => {
    try {
        console.log('User: ', req.user)
        const entries = await pool.query('SELECT * FROM article WHERE user_id = $1', [req.user])
        res.json({ entries: entries.rows })
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error');
    }
})

router.get('/:id', authorization, async (req, res) => {
    try {
        console.log(req.params.id);
        const entry = await pool.query('SELECT * FROM article WHERE article_id = $1 AND user_id = $2', [`${req.params.id}`, req.user])
        res.json(entry)
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error');
    }
})

router.delete('/', authorization, async (req, res) => {
    try {
        console.log('Id to be deleted: ', req.body)

        const delEntry = await pool.query('DELETE FROM article WHERE article_id = $1', [req.body.id])
        console.log(delEntry);
        res.status(202).json('Entry Deleted!')
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Server error while deleting')
    }
})

module.exports = router;