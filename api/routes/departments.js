const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'department were fetched'
    });
});

router.post('/', (req, res, next) => {
    const department = {
        departmentId: req.body.departmentId,
        departmentName: req.body.departmentName
    }
    res.status(201).json({
        message: 'Department was created',
        data: department
    });
});

router.get('/:departmentId', (req, res, next) => {
    const departmentId = req.params.departmentId
    res.status(200).json({
        message: 'Department details',
        departmentId: departmentId
    });
});

router.delete('/:departmentId', (req, res, next) => {
    res.status(200).json({
        message: 'Department deleted',
    });
});

module.exports = router;