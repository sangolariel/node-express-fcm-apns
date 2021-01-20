import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import * as config from './configs/ormconfig';
// import PostController from './controllers/post.controller';
import AuthenticationController from './controllers/authentication.controller';
import CategoryController from './controllers/category.controller';
import AddressController from './controllers/address.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App(
    [
      // new PostController(),
      new AuthenticationController(),
      new AddressController(),
      new CategoryController(),
    ],
  );
  app.listen();
})();
