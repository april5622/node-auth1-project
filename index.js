const express = require("express");
const helmet = require("helmet");
const session =  require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const authRouter = require("./auth/auth-Router")
const usersRouer = require("./users/users-router")
const dbConfig = require("./db/config")


const server = express();
const port = process.env.PORT || 5000

server.use(helmet());
server.use(express.json());
server.use(session({
    name:"token",
    resave:false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET || "secret",
    cookie: {
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: tre
    })
}))

server.use("/api", authRouter)
server.use("/api/users", usersRouer)


server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "ERROR ERROR"
    })
})


server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});