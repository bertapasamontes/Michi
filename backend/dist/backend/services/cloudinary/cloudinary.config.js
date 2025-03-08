"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_1 = require("../../env");
cloudinary_1.v2.config({
    cloud_name: env_1.environment.cloudinaryCloudName,
    api_key: env_1.environment.cloudinariApiKey,
    api_secret: env_1.environment.cloudinaryApiSecretKey
});
