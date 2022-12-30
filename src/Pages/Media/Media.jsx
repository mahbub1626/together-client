import React from 'react';
import NewsFeed from '../NewsFeed/NewsFeed';
import Post from '../Post/Post';

const Media = () => {
    return (
        <div>
            <h2 className='text-xl fint-bold'>News Feed</h2>
            <Post></Post>
            <NewsFeed></NewsFeed>
        </div>
    );
};

export default Media;