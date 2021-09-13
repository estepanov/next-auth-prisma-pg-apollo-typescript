module.exports = {
  client: {
    includes: ['./pages/**/*.tsx','./pages/*.tsx','./components/**/*.tsx','./components/*.tsx', './graphql/**/*.ts'],
    localSchemaFile: './graphql/schema.graphql'
  },
  service: {
    localSchemaFile: './graphql/schema.graphql'
  }
};