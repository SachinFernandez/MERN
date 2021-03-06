const User = require("../models/userModels");
const mongoose = require("mongoose");

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("name age _id image ")
    .exec()
    .then(results => {
      const response = {
        count: results.length,
        users: results.map(result => {
          return {
            name: result.name,
            age: result.age,
            image: result.image,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:3001/users/" + result._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.users_create_user = (req, res, next) => {
  console.log(req.file);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    image: req.file.path
  });
  user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Users created successfully",
        data: {
          name: result.name,
          age: result.age,
          image: result.image,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3001/users" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.users_get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("name age _id image ")
    .exec()
    .then(data => {
      console.log("From database", data);
      if (data) {
        res.status(200).json({
          user: data,
          request: {
            type: "GET",
            url: "http://localhost:3001/users"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.users_update_user = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET",
          url: "http://localhost:3001/users" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.users_delete_user = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted",
        request: {
          type: "POST",
          url: "http://localhost:3001/users",
          body: { name: "String", age: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
