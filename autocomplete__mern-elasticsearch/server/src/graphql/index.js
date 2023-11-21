const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./types");
const { resolvers } = require("./resolvers");
const { accessLogger, errorLogger } = require("../lib/logger")(__filename);

const myPlugin = {
  requestDidStart(requestContext) {
    accessLogger.info('Request started!');

    return {
      parsingDidStart(requestContext) {
        accessLogger.info('Parsing started!');
        
        return (err) => {
          if (err) {
            errorLogger.error(err);
          }
        }
      },
      validationDidStart(requestContext) {
        errorLogger.error('Validation started!');
        
        return (errs) => {
          if (errs) {
            errs.forEach(err => errorLogger.error(err));
          }
        }
      },
      executionDidStart() {
        return (err) => {
          if (err) {
            errorLogger.error(err);
          }
        }
      }
    };
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [myPlugin],
  context: ({ req }) => ({ req }),
});

// Start the Apollo Server before applying middleware
async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app }); // Make sure to replace 'app' with your Express app instance
}

module.exports = { apolloServer, startApolloServer };
