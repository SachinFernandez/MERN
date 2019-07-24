const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Admin = require("../models/adminModels")

router.post("/signup", (req, res, next) => {
    Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
        if(admin.length >= 1) {
            return res.status(409).json({
                message: "Mail axists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(201).json({
                        error: err
                    })
                } else {
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    admin
                        .save()
                        .then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: "User Created"
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                }
            })
        }
    })
});

router.delete("/:adminId", (req, res, next) => {
    Admin.deleteOne({ _id: req.params.adminId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted"
        })    
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;
