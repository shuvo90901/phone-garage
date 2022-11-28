import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = data => {
        console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true })

            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className=" card  shadow-2xl lg:w-1/2 md:3/4 mx-auto">
            <h1 className="text-5xl font-bold text-center">Log In</h1>
            <div className="card-body">
                <form onSubmit={handleSubmit(handleLogin)}>
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
                <p>If you are new in Phone Garage ? <Link className='font-bold' to='/signup'>Please Register.</Link></p>
                <div className="divider">OR</div>
                <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
            </div>

        </div>
    );
};

export default Login;