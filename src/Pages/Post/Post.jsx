import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';
// import './Post.css'

const Post = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { user } = useContext(AuthContext);
    const imageHostkey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostkey);

    const love = null;
    const comment = null;

    // time and date
    const date = new Date();
    const n = date.toDateString();
    const time = date.toLocaleTimeString();


    const handlePublish = data => {
        console.log(data)

        // upload imag and hosting in imgbb
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostkey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const post = {
                        displayName: user?.displayName,
                        email: user.email,
                        photo: user?.photoURL,
                        postText: data.postText,
                        love,
                        comment,
                        img: imgData.data.url,
                        postTime: {
                            date: n,
                            time: time
                        },
                        isVerified: false
                    }
                    console.log(post)

                    //  save post in the database
                    fetch('https://together-server.vercel.app/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.acknowledged) {
                                toast.success('Post Successfully!')
                            }
                        })
                }

            })

    }








    // const handlePublish = data => {
    // savePost(user.displayName, user.email, data.postText, data.photo, love, comment)




    // user data create db
    // const savePost = (displayName, email, postText, photo, love, comment) => {
    //     const post = {
    //         displayName,
    //         email,
    //         postText,
    //         photo,
    //         love,
    //         comment
    //     };
    //     console.log("Post create db", post)
    //     fetch('https://together-server.vercel.app/posts', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(post)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data.acknowledged) {
    //                 toast.success('Post Successfully!')
    //             }
    //             setCreateUserEmail(email)
    //         })
    // }


    return (
        <div className='flex'>

            <div className="avatar">
                <div className="w-24 h-24 rounded-full">
                    <img src={user?.photoURL} alt="" />
                </div>
            </div>

            <div className='ml-4 mt-4'>
                <form onSubmit={handleSubmit(handlePublish)} >
                    <div className="form-control mr-4">
                        {/* <label className="label"><span className="label-text">Email</span></label> */}
                        <textarea type="text" {...register("postText", {
                            required: 'Some Text is required'
                        })} className="input textarea input-bordered w-full "
                            placeholder="What`s on your mind? feel free write here!" />
                        {errors.postText && <p className='text-red-600'>{errors.postText?.message}</p>}
                    </div>
                    <div className='flex mt-4 mr-4'>
                        <div className="form-control mr-4 image-upload">
                            <label for="file-input">
                                {/* <ImFilePicture className='m-2' /> */}
                            </label>
                            <input id="file-input"
                                type="file"
                                {...register("photo")} className="file-input file-input-bordered file-input-info w-full max-w-xs"
                            />
                            {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}
                        </div>

                        <div>
                            <input className='btn btn-info hover:bg-cyan-500' value='Publish' type="submit" />
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Post;