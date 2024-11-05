import multer from "multer";
import path from "path";

// Configure storage (for local storage in this example)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // Add unique suffix to prevent overwrites
    cb(null, uniqueSuffix);
  },
});

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
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profilePic"); // 'profilePic' is the field name in the form

export default upload;
