import httpServer from 'http-server';
import httpTerminator from 'http-terminator';

/** @typedef {import('http').Server} Server */

/**
 *
 * @param {number} port
 * @param {string} root
 * @returns {Promise<Server>}
 */
export const launch = async (port, root) => {
  const server = httpServer.createServer({ root });
  await new Promise((resolve) => server.listen(port, 'localhost', resolve));
  return server;
};

/**
 *
 * @param {Server} server
 */
export const terminate = async (server) => {
  const serverConfig =
    /** @type {import('http-terminator').HttpTerminatorConfig} */ (
      /** @type {unknown} */ (server)
    );
  await httpTerminator.createHttpTerminator(serverConfig).terminate();
};
