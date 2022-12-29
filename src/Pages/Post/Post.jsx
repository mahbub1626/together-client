import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Post = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { signIn, signInWithGoogle, updateUser } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('')
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreateUserEmail] = useState('')

    const [loginUserEmail, setLoginUserEamil] = useState('')

    const handlePublish = data => {
        console.log(data)
    }

    // user data create db
    const saveUser = (displayName, email,) => {
        const post = {
            displayName,
            email
        };
        console.log("Post create db", post)
        fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCreateUserEmail(email)
            })
    }
    return (
        <div className='flex mt-12'>
            <div className="avatar">
                <div className="w-24 h-24 rounded-full">
                    <img src="https://placeimg.com/192/192/people" />
                </div>
            </div>
            <div className=''>
                <form onSubmit={handleSubmit(handlePublish)} className='flex w-full'>
                    <div className="form-control mr-4">
                        {/* <label className="label"><span className="label-text">Email</span></label> */}
                        <textarea type="text" {...register("postText", {
                            required: 'Some Text is required'
                        })} className="input textarea input-bordered w-full "
                            placeholder="What`s on your mind? feel free write here!" />
                        <input />
                        {errors.postText && <p className='text-red-600'>{errors.postText?.message}</p>}
                    </div>
                    <div>
                        <input className='btn btn-info hover:bg-cyan-500' value='Publish' type="submit" />
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Post;