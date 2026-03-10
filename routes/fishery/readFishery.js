const express = require('express');
const router = express.Router();
const Lowisko = require('../../models/lowisko');
const {verifyToken} = require('../../utils/JWT_Token');

router.get("/", verifyToken, async (req, res) => {
    await Lowisko.find().then((lowiska) => {
        res.status(200).json({message: "Lowiska retrieved successfully!", lowiska});
    }).catch((err) => res.status(500).json({message: "Error retrieving lowiska!", error: err}));
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    await Lowisko.findById(id).then((lowisko) => {
        if(!lowisko) return res.status(404).json({message: "Lowisko not found!"});
        res.status(200).json({message: "Lowisko retrieved successfully!", lowisko});
    }).catch((err) => res.status(500).json({message: "Error retrieving lowisko!", error: err}));
});

module.exports = router;