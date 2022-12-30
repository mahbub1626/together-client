import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
const GoogleProvider = new GoogleAuthProvider();

const LogIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { signIn, signInWithGoogle, updateUser } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('')
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreateUserEmail] = useState('')

    const location = useLocation();
    const [loginUserEmail, setLoginUserEamil] = useState('')
    // const [token] = useToken(loginUserEmail)
    const navigate = useNavigate();

    const handleLongin = data => {
        setLoginError('')
        console.log(data)
        console.log(errors)
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('LogIn Successfully!')
                // setLoginUserEamil(data.email);
            })
            .catch(error => {
                console.error(error)
                setLoginError(error.message)
            })
    }
    

    const handleSignInWithGoogle = () => {
        signInWithGoogle(GoogleProvider)
            .then(result => {
                const user = result.user;
                console.log('Sign up With Google Successfully!', user)
                toast.success('Sign up With Google Successfully!')
                const dateOfBirth= null;
                const gender= null;
                // const dateOfBirth= null;

                const userInfo = {
                    displayName: user.displayName, 
                    email: user.email, 
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(user.displayName, user.email, dateOfBirth, gender, user.emailVerified, user.photoURL, user.phoneNumber )
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error)
                setSignUpError(error)
            })
    }

    // user data create db
    const saveUser = (displayName, email,dateOfBirth, gender, emailVerified, photoURL, phoneNumber) => {
        const user = {
            displayName,
            email,
            dateOfBirth,
            gender,
            emailVerified,
            photoURL,
            phoneNumber

        };
        console.log("user data create db", user)
        fetch('https://together-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCreateUserEmail(email)
            })
    }

    return (
        <div>
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
                        <input className='btn btn-info hover:bg-cyan-500 w-full' value='Login' type="submit" />
                        <div>
                            {loginError && <p className='text-red-500'>{loginError}</p>}
                        </div>
                    </form>
                    <p>Haven`t an account? <Link className='text-secondary' to='/signup'>Create new account</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={handleSignInWithGoogle} className='btn btn-outline hover:btn-info w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default LogIn;