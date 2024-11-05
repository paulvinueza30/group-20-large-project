// src/types/express/index.d.ts

declare namespace Express {
  export interface Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
}
