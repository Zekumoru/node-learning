import { RequestHandler } from './types';
import fs from 'fs/promises';

const pageHandler: RequestHandler = async (_req, res, query) => {
  const filename = (() => {
    if (query.pathname === '/') return './index.html';
    return './pages' + query.pathname;
  })();

  try {
    const data = await fs.readFile(filename);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
  } catch (error) {
    console.error(error);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
  }

  return res.end();
};

export default pageHandler;
