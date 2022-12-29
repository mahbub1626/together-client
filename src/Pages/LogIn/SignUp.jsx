import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const GoogleProvider = new GoogleAuthProvider();

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreateUserEmail] = useState('')

    const handleSignUp = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('Sign up Successfully!')
                const userInfo = {
                    displayName: data.name,
                    email: data.email,
                    dateOfBirth: data.dateofbirth,
                    gender: data.gender,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.dateofbirth, data.gender, user.emailVerified, user.photoURL, user.phoneNumber )
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error)
                setSignUpError(error)
            })
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle(GoogleProvider)
            .then(result => {
                const user = result.user;
                console.log('Sign up With Google Successfully!', user, user.displayName, user.email, user.emailVerified, user.phoneNumber)
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
        fetch('http://localhost:5000/users', {
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
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96'>
                <h2 className='text-2xl text-center'>Sign up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" {...register('name', {
                            required: "Name is required"
                        })} className="input input-bordered w-full " />
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" {...register('email', {
                            required: "Email is requied"
                        })} className="input input-bordered w-full " />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be 6 characters long' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be strong' }
                        })} className="input input-bordered w-full " />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                    </div>
                    {/* Date of Birth */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Date of birth</span></label>
                        <input type="date" {...register('dateofbirth', {
                            required: 'Date of birth is required',
                        })} className="input input-bordered w-full " />
                        {errors.dateofbirth && <p className='text-red-500'>{errors.dateofbirth?.message}</p>}
                    </div>

                    {/* gender */}
                    <div className="flex my-4 items-center">
                        <h3 className='font-bold mr-4'>Gender:</h3>
                        <label className="label"><span className="label-text ">Male</span></label>
                        <input type="radio"
                            {...register('gender')}
                            value='Male' className="radio mr-4" checked />
                        <label className="label"><span className="label-text ">Female</span></label>
                        <input type="radio"
                            {...register('gender',)}
                            value='Female' className="radio mr-4" />
                        <label className="label"><span className="label-text ">Custom</span></label>
                        <input type="radio"
                            {...register('gender',)}
                            value='Custom' className="radio " />
                    </div>

                    {/* Sign up submit button */}
                    <input className='btn btn-info hover:bg-cyan-500  w-full mt-3 text-white' value='Sign up' type="submit" />
                    {signUpError && <p className='text-red-500'>{signUpError}</p>}
                </form>
                <p>Already have account? <Link className='text-secondary' to='/login'>Please login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleSignInWithGoogle} className='btn btn-outline hover:btn-info w-full '>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;