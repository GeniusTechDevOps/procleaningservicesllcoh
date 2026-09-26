import fs from 'fs';
import path from 'path';

export function getRoofImages() {
  const roofDir = path.resolve('./public/Roof');
  const folders = fs.readdirSync(roofDir).filter((folder) => {
    return fs.statSync(path.join(roofDir, folder)).isDirectory();
  });

  const validImageExtensions = ['.jpg', '.png', '.avif'];

  const foldersAndImages = folders.map((folder) => {
    const images = fs.readdirSync(path.join(roofDir, folder)).filter((file) => {
      return validImageExtensions.includes(path.extname(file).toLowerCase());
    });

    return { folder, images };
  });

  return foldersAndImages;
}
