import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, providerLogin, googleProvider } = useContext(AuthContext);
    const [role, setRole] = useState('customer')
    const navigate = useNavigate();

    const handleSignUp = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                        navigate('/')
                    })
                    .catch(err => console.log(err))
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleAccountType = type => {
        setRole(type)
    }

    const saveUser = (name, email) => {
        const user = { name, email, role };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('save User', data)
            })
    }

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                saveUser(user?.displayName, user?.email)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className=" card  shadow-2xl lg:w-1/2 md:3/4 mx-auto my-10">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
            <br />
            <div className='flex justify-center items-center'>
                <input type="radio" name="radio-2" className="radio radio-primary" onClick={() => handleAccountType('')} checked />
                <label className='px-3'>Customer Account</label>
                <input type="radio" name="radio-2" className="radio radio-primary" onClick={() => handleAccountType('seller')} />
                <label className='px-3'>Seller Account</label>
            </div>
            <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input type="text"
                        {...register("name", {
                            required: 'Name is required'
                        })}
                        placeholder="Enter Your Name" className="input  input-bordered" />
                    {errors.name && <p>{errors.name?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input type="email"
                        {...register("email", {
                            required: 'Email is required'
                        })}
                        placeholder="Enter Your Email" className="input  input-bordered" />
                    {errors.email && <p>{errors.email?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Password</span>
                    </label>
                    <input type="password"
                        {...register("password", {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be 6 charecter or longer' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })}
                        placeholder="Enter Your Password" className="input input-bordered" />
                    {errors.password && <p>{errors.password?.message}</p>}
                </div>
                <input className='btn btn-acent w-full mt-4' value='SignUp' type="submit" />
            </form>
            <p>Already have an account ? <Link className='font-bold' to='/login'>Please login</Link></p>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
        </div>
    );
};

export default SignUp;