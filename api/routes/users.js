const express = require("express")
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /users'
    });
});

router.post('/', (req, res, next) => {
    const user = {
        name: req.body.name,
        age: req.body.age
    }
    res.status(201).json({
        message: 'Handling POST request to /users',
        data: user
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id === 'special') {
        res.status(200).json({
            message: 'You discovered the specail id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'you passed an id'
        });
    }
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated user!'
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted user!'
    });
});

module.exports = router;