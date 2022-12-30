import { useQuery } from '@tanstack/react-query';
import React from 'react';
import NewsFeedPost from './NewsFeedPost';

const NewsFeed = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://together-server.vercel.app/posts');
            const data = await res.json();
            return data;
        }
    })

    console.log(posts)
    return (
        <div className='mt-8'>
            {
                posts.map(post=> <NewsFeedPost
                key={post._id}
                post={post}
                ></NewsFeedPost>)
            }
        </div>
    );
};

export default NewsFeed;