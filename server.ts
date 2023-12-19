import { createServer } from 'node:http';
import pageHandler from './handlers/pageHandler';
import uploadHandler from './handlers/uploadHandler';
import { RequestHandler } from './handlers/types';
import mailHandler from './handlers/mailHandler';

const hostname = 'localhost';
const host = `http://${hostname}/`;
const port = 3000;

const handlers = new Map<string, RequestHandler>();
handlers.set('/upload', uploadHandler);
handlers.set('/mail', mailHandler);

const server = createServer(async (req, res) => {
  if (!req.url) return res.end();
  const query = new URL(req.url, host);

  const handler = (() => {
    if (handlers.has(query.pathname)) {
      return handlers.get(query.pathname)!;
    }
    return pageHandler;
  })();

  return await handler(req, res, query);
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${host}:${port}/`);
});
