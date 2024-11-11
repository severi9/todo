import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const __dirname = import.meta.dirname

const intializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname,"../todo.sql"), "utf8")
    pool.query(sql)
}
const insertTestUser = (email, password) => {
    bcrypt.hash(password,10,(error,hashedPassword) => {
        pool.query('insert into account (email,password) values ($1,$2)',
            [email,hashedPassword])
    }) 
}
const getToken = (email) => {
    return jwt.sign({user: email}, process.env.JWT_SECRET_KEY)
}

export { intializeTestDb , insertTestUser, getToken }