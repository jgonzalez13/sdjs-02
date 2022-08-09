import { ApolloError, ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { schema } from './graphql/schema';
import mongoose from 'mongoose';

const mongodbURI = process.env.MONGODB_URI;

export const connectDB = async (mongodbURI: string) => {
  if (!mongodbURI) {
    return Promise.reject('MongoDB URI is not defined');
  }
  try {
    await mongoose.connect(mongodbURI, { autoIndex: false }, (error) => {
      if (error) {
        console.log(error);
      }
    });
    console.log('Mongodb database started...');
    return mongoose.connection;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

async function startApolloServer() {
  try {
    await connectDB(mongodbURI);

    const app = express();
    app.use(cors());
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      schema: schema,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground({
              settings: {
                'editor.theme': 'light',
              },
            }),
      ],
    });

    await server.start();

    server.applyMiddleware({ app });

    const port = process.env.port || 3333;
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  } catch (err) {
    throw new ApolloError('Something went wrong in Apollo');
  }
}

const server = startApolloServer();

export default server;
