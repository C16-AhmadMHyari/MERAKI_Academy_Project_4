const jwt = require("jsonwebtoken");
const express = require("express");

const authentication = async (req, res, next) => {
  
  
  if (!req.headers.authorization) {
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  } else {
    try {
      const token = req.headers.authorization.split(" ").pop();
      const verify = await jwt.verify(token, process.env.SECRET);
      req.token = verify;
      next();
    } catch (err) {
      res.status(401).json("token is not valid or expired");
    }
  }
};

module.exports = authentication;
