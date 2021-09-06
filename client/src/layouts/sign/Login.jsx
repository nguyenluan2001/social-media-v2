import React, { useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import { useMutation } from "@apollo/client"
import { login } from "../../graphql-client/user/mutation"
function Login() {
    const [loginMutation, { data, loading, error }] = useMutation(login)
    const history=useHistory()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            await loginMutation({
                variables: {
                    email: values.email,
                    password: values.password
                }
            })
        }
    })
    useEffect(() => {
        const setToken=async ()=>{
            if(!loading && data)
            {
                await localStorage.setItem("token",data?.login.token)
                await history.push("/")
            }
        }
        setToken()
    }, [loading])
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="wp-input">
                <input type="text" placeholder="Email or phone number" name="email" onChange={formik.handleChange} />
                <input type="password" placeholder="Password" name="password" onChange={formik.handleChange} />
                <button>Log in</button>
                <Link to="forgot-password">Forgot password</Link>
            </div>
            <Link to="/register" className="other-btn">Create a new account</Link>
        </form>
    )
}

export default Login
