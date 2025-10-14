import {v2 as cloudinary} from 'cloudinary'

import { environment } from '../../env'

cloudinary.config({
    cloud_name: process.env.cloudinaryCloudName,
    api_key: process.env.cloudinariApiKey,
    api_secret: process.env.cloudinaryApiSecretKey
});

export default cloudinary;