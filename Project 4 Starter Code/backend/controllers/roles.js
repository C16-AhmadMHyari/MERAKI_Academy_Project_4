const express = require("express");

const roleModel = require("../models/roles");

const createNewRole = async (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
  });
  try {
    const result = await newRole.save();
    res.status(201).json({
      succes: true,
      message: "Role created successfully",
      role: result,
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "Server Error",
      error: err,
    });
  }
};

module.exports = { createNewRole };
