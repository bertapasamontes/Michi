"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.cloudinaryCloudName,
    api_key: process.env.cloudinariApiKey,
    api_secret: process.env.cloudinaryApiSecretKey
});
exports.default = cloudinary_1.v2;
