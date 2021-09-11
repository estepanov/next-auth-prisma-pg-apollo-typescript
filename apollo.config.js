module.exports = {
  client: {
    service: {
      name: 'api',
      includes: ['./pages/**/*.tsx','./pages/*.tsx','./components/**/*.tsx','./components/*.tsx'],
      localSchemaFile: './graphql/schema.graphql'
    }
  },
};