import { Link } from "react-router-dom"
import './Authentication.css'
import React from "react"

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
})

export default function Authentication({AuthenticationMode}) {
    return(
        <div>
            <h3>{AuthenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"></input>
                </div>
                <div>
                    <button>{AuthenticationMode ===  AuthenticationMode.Login ? 'Log in' : 'Submit'}</button>
                </div>
                <div>
                    <Link>{AuthenticationMode === Authentication.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}</Link>
                </div>
            </form>
        </div>
    )
}