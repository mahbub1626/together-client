import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const GoogleProvider = GoogleAuthProvider();
const LogIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('')
    const location = useLocation();
    const [loginUserEmail, setLoginUserEamil] = useState('')
    const [token] = useToken(loginUserEmail)
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLongin = data => {
        setLoginError('')
        console.log(data)
        console.log(errors)
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEamil(data.email);
            })
            .catch(error => {
                console.error(error)
                setLoginError(error.message)
            })
    }

    const handlePopup = ()=>{
        signInWithGoogle(GoogleProvider)
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLongin)}>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: 'Email Address is required'
                        })} className="input input-bordered w-full " />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: 'Password is required',
                            minLength: { value: 6, message: "Password must be 6 characters of longer" }
                        })} className="input input-bordered w-full " />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                        <label className="label"><span className="label-text">Forget Password?</span></label>
                    </div>
                    <input className='btn btn-accent w-full' value='Login' type="submit" />
                    <div>
                        {loginError && <p className='text-red-500'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Doctors Portal? <Link className='text-secondary' to='/signup'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handlePopup} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default LogIn;