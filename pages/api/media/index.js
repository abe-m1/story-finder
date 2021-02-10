import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: '',
});

function saveImage(data, publicId) {
  return cloudinary.v2.uploader.upload(data, {
    public_id: 'people/' + publicId,
  });
}

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const pets = await Pet.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const publicID = `story-${Math.random().toString(24).slice(-8)}`;
        const saveToCloud = await saveImage(req.body.imagePreviewUrl, publicID);

        if (saveToCloud) {
          const user = await User.findByIdAndUpdate(
            req.body.userId,
            { image_url: saveToCloud.secure_url },
            {
              new: true,
              runValidators: true,
            }
          );
          res.status(201).json({ success: true, data: user });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}