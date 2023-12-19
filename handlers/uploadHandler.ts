import { RequestHandler, Response } from './types';
import formidable from 'formidable';
import fs from 'fs/promises';

type UploadFile = {
  filepath: string;
  newFilename: string;
  originalFilename: string;
  mimetype: string;
  size: number;
};

type UploadFiles = {
  upload: UploadFile[];
};

const uploadHandler: RequestHandler = async (req, res, _query) => {
  const form = formidable({});

  try {
    const [fields, files] = (await form.parse(req)) as unknown as [
      formidable.Fields<string>,
      UploadFiles
    ];

    const promises = files.upload.map(async (file) => {
      const oldPath = file.filepath;
      const newPath = 'upload/' + file.originalFilename;
      await fs.rename(oldPath, newPath);
    });

    await Promise.all(promises);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<p>File(s) uploaded!</p>');
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.write('<p>Error! Could not parse files.</p>');
  }

  return res.end();
};

export default uploadHandler;
