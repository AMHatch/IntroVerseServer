
module.exports = {
"development": {
    "use_env_variable": "DATABASE_URL",
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
}
}