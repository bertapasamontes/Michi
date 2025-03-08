import {v2 as cloudinary} from 'cloudinary'

import { environment } from '../../env'

cloudinary.config({
    cloud_name: environment.cloudinaryCloudName,
    api_key: environment.cloudinariApiKey,
    api_secret: environment.cloudinaryApiSecretKey
});

export default cloudinary;