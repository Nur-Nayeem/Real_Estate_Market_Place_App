import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import 'dotenv/config'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';



dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_sectret: process.env.API_KEY_SECRET
})
console.log(process.env.CLOUD_NAME);


mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.log(err);
})

const app = express();

app.use(cors());

app.use(express.json());


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post("/upload-profile", upload.single("my_file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (uploadError, cloudinaryResult) => {
                if (uploadError) {
                    return res.status(500).json({
                        success: false,
                        message: "File upload failed",
                        error: uploadError.message,
                    });
                }
                res.json({
                    success: true,
                    message: "File uploaded successfully",
                    fileUrl: cloudinaryResult.secure_url,
                    public_id: cloudinaryResult.public_id,
                });

            }
        );

        cloudinaryUploadStream.end(req.file.buffer);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "File upload failed",
            error: error.message,
        });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);