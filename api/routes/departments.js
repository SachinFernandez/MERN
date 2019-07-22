const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const Department = require('../models/departmentModels')
const User = require('../models/userModels');

router.get('/', (req, res, next) => {
    Department.find()
    .select('user department_name _id')
    .populate('user', 'name age')
    .exec()
    .then(results => {
        res.status(200).json({
            count: results.length,
            departments: results.map(result => {
                return {
                    _id: result._id,
                    userId: result.user,
                    department_name: result.department_name,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/departments' + result._id
                    }
                }   
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.post("/", (req, res, next) => {
    User.findById(req.body.userId)
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            }
            const department = new Department({
                _id: mongoose.Types.ObjectId(),
                user: req.body.userId,
                department_name: req.body.department_name
            });
            return department.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Department created",
                data: {
                    _id: result._id,
                    userId: result.userId,
                    department_name: result.department_name
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3001/departments/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get('/:departmentId', (req, res, next) => {
    Department.findById(req.params.departmentId)
    .populate('user', 'name age')
    .exec()
    .then(result => {
        if(!result) {
            return res.status(404).json({
                message: "Department not found"
            });
        }
        res.status(200).json({
            data: {
                _id: result._id,
                user_id: result.user,
                department_name: result.department_name
            },
            request: {
                type: 'GET',
                url: "http://localhost:3001/departmets"
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err    
        })
    })
});

router.delete('/:departmentId', (req, res, next) => {
    Department.remove({ _id: req.params.departmentId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Department deleted",
            request: {
                type: "POST",
                url: "http://localhost:3001/departments",
                body: { user_id: "ID", department_name: "String" }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

module.exports = router;