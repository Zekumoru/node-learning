import { IncomingMessage, ServerResponse } from 'node:http';

type Response = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
};

type RequestHandler = (
  req: IncomingMessage,
  res: Response,
  query: URL
) => Promise<Response> | Response;

export { RequestHandler, Response };
