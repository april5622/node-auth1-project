// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./db/user.db3",
  },// connection 

  migrations: {
    directory: "./db/migrations",
  },

  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done)
    },
  },

}; //exports
