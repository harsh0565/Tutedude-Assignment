import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
import Layout from '../layout/Layout';
import { useAuth } from '../context/Auth';
const Login = () => {
    const [auth,setAuth] = useAuth(); 
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    }

    const submitForm = async (e) => {

        e.preventDefault();
        console.log(user);
        await axios.post(`http://localhost:8080/api/v1/auth/login`, user , { withCredentials: true }).then((res) => {
            if (res.data.success) {
                // console.log(res.data.message);

                toast.success(res.data.message);
                setAuth({
                    ...auth , 
                    user: res.data.user,
                })
                localStorage.setItem("auth" , JSON.stringify(res.data))
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            else {
                toast.error(res.data.message);
            }
        }).catch((error) => {
            console.log(error);
            toast.error("something went wrong")

        })
    }
    return (
        <Layout >


            <div className='d-flex align-item-center justify-content-center bg-body-secondary p-2'>

                <form className='border border-primary p-5 m-5 w-50' onSubmit={submitForm}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={inputHandler} type="email" className="form-control" required name='email' id="email" aria-describedby="emailHelp" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={inputHandler} type="password" className="form-control" required name='password' id="password" />
                    </div>

                    <input type="reset" className='btn' value="Reset" />
                    <center> <button type="submit" className="btn btn-primary">Login</button></center>
                    <center className='mt-5 p-1'>New User? <Link to={'/register'}>Register</Link>  </center>
                </form>
            </div>
        </Layout>
    )
}

export default Login
