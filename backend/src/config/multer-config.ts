import fs from "fs";
import multer from "multer";
import path from "path";
import sharp from "sharp";

// Get the directory name of the current module using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Ensure 'uploads' directory exists
const uploadPath = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // Creates the directory if it doesn't exist
}

// Configure storage (for local storage in this example)
const storage = multer.memoryStorage(); // Use memory storage for buffering image

// File validation to ensure only images are uploaded
const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed."));
  }
  cb(null, true);
};

// Multer configuration with file size limit (5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("profilePic"); // 'profilePic' is the field name in the form

// Resize the image directly in the storage engine using sharp
const resizeImage = (req: any, res: any, next: any) => {
  if (req.file) {
    const resizedFilePath = path.join(
      uploadPath,
      "resized-" + Date.now() + path.extname(req.file.originalname)
    );

    // Resize the image using sharp to 318x400
    sharp(req.file.buffer)
      .resize(318, 400) // Resize to 318px width and 400px height
      .toFile(resizedFilePath, (err, info) => {
        if (err) {
          return next(err); // Handle error during resizing
        }

        // Update the file path in the request object to the resized image
        req.file.path = resizedFilePath;
        req.file.filename = path.basename(resizedFilePath); // Ensure filename is set
        next();
      });
  } else {
    next();
  }
};

export { upload, resizeImage };
