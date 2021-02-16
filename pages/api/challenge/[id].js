import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

function saveImage(data, publicId) {
  return cloudinary.v2.uploader.upload(data, {
    public_id: 'people/' + publicId,
  });
}

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    // case 'GET' /* Get a model by its ID */:
    //   try {
    //     const pet = await Pet.findById(id);
    //     if (!pet) {
    //       return res.status(400).json({ success: false });
    //     }
    //     res.status(200).json({ success: true, data: pet });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;

    case 'PATCH' /* Edit a model by its ID */:
      try {
        const publicID = `story-${Math.random().toString(24).slice(-8)}`;
        let imageUrl;
        if (req.body.imagePreviewUrl) {
          const saveToCloud = await saveImage(
            req.body.imagePreviewUrl,
            publicID
          );
          imageUrl = saveToCloud.secure_url;
        }

        const newData = {
          $inc: { nextChallengeIndex: 1 },
          $push: {
            challenges: {
              position: req.body.position,
              // name: req.body.name,
              challengeImage: imageUrl,
              challengeType: req.body.connection,
              challengeType: req.body.challengeType,
              challengeId: req.body.challengeId,
              challengeName: req.body.challengeName,
              challengeDescription: req.body.challengeDescription,
              responseDescription: req.body.description,
              connectionId: req.body.connection,
              challengeResponse: req.body.challengeResponse,
            },
            markers: {
              position: req.body.position,
              userId: req.body.userId,
              userName: req.body.name,
              connectionType: req.body.connection,
              userImage: imageUrl,
              type: 'connection',
            },
          },
          //
        };

        const user = await User.findByIdAndUpdate(id, newData, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPet = await Pet.deleteOne({ _id: id });
        if (!deletedPet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
