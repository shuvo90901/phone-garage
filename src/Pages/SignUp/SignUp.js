import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);

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
                    .then(() => { })
                    .catch(err => console.log(err))
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="min-h-screen card  shadow-2xl lg:w-1/2 md:3/4 mx-auto">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
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
                <input className='btn btn-acent w-full mt-4' value='Login' type="submit" />
            </form>
        </div>
    );
};

export default SignUp;