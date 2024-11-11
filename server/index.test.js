import { expect } from "chai"
import fetch from 'node-fetch';
import { getToken, insertTestUser, intializeTestDb }from './helpers/test.js'

  
describe('GET Tasks', () => {
    before(async () => {
        await intializeTestDb();
    })
    it ('should get all tasks', async() => {
        const response = await fetch('http://localhost:3001/')
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('array').that.is.not.empty
        expect(data[0]).to.include.all.keys('id','description')
    })
})

describe('POST Task', () => {
    it ('should post a task', async() => {
        const response = await fetch("http://localhost:3001/create",{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({'description':'Task from unit test'})
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })
    it ('should not post a task without description', async() => {
        const response = await fetch("http://localhost:3001/create",{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'description':null})
        })
        const data = await response.json()
        expect(response.status).to.equal(401)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe('DELETE Task', () => {
    it ('should delete a task', async() => {
        const response = await fetch("http://localhost:3001/delete/1",{
            method: 'delete'
        })
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })
})

describe('POST register', () => {
    const email = 'register@foo.com'
    const password = 'register123'
    it ('should register with a valid email and password', async() => {
        const response = await fetch("http://localhost:3001/user/register",{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':email,'password':password})
        })
        const data = await response.json()
        expect(response.status).to.equal(201,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email')
    })
})

describe('POST login',async () => {
    const email = 'login@foo.com';
    const password = 'login123';
    await insertTestUser(email, password);

    it ('should login with valid credentials', async() => {
        const response = await fetch("http://localhost:3001/user/login",{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':email,'password':password})
        })
        const data = await response.json()
        expect(response.status).to.equal(200,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email', 'token')
    })
})
describe('POST Task', () => {
    const email = 'post@foo.com'
    const password = 'post123'
    before(async () => {
        await insertTestUser(email, password);
    });
    const token = getToken(email)
    it ('should post a task', async() => {
        
        const response = await fetch("http://localhost:3001/create",{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description':'Task from unit test'})
        })
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })
})