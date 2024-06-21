import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName.trim(),
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // delete file after upload successfully
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          }
          console.log('deleted');
        });
      },
    );
  });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  //  const optimizeUrl = cloudinary.url('shoes', {
  //    fetch_format: 'auto',
  //    quality: 'auto',
  //  });

  //  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  //  const autoCropUrl = cloudinary.url('shoes', {
  //    crop: 'auto',
  //    gravity: 'auto',
  //    width: 500,
  //    height: 500,
  //  });

  //  console.log(autoCropUrl);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
