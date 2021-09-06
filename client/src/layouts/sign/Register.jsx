import React from 'react'
import { Link,useHistory } from 'react-router-dom'
import {useFormik} from "formik"
import {useMutation} from "@apollo/client"
import {register} from "../../graphql-client/user/mutation"
function Register() {
    const [registerMutation,dataMutation]=useMutation(register)
    const history=useHistory()
    const formik=useFormik({
        initialValues:{
            username:"",
            email:"",
            password:"",
            gender:""
        },
        onSubmit:async (values)=>{
            console.log(values)
            await registerMutation({
                variables:{
                    username:values.username,
                    email:values.email,
                    password:values.password,
                    gender:values.gender
                }
            })
            await history.push("/login")
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="wp-input">
                <input type="text" placeholder="Username" name="username" onChange={formik.handleChange} />
                <input type="text" placeholder="Email or phone number" name="email" onChange={formik.handleChange} />
                <input type="password" placeholder="Password" name="password" onChange={formik.handleChange} />
                <select  id="" name="gender" onChange={formik.handleChange}>
                    <option value="" hidden>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button>Register</button>
            </div>
            <Link to="/login" className="other-btn">Already have account</Link>
        </form>
    )
}

export default Register
