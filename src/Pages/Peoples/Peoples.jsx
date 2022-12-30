import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const Peoples = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://together-server.vercel.app/users');
            const data = await res.json();
            return data;
        }
    })

    console.log(users)
    const handleFriendRequest = id => {
        fetch(`https://together-server.vercel.app/users/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Frient Request Send.');
                    refetch();
                }
            })

    }
    return (
        <div>
            <h1 className='text-3xl my-5'>People Near by</h1>
            <div className="overflow-x-auto">

                {
                    users.map((user, i) => <tr className="hover"
                        key={user._id}
                    >
                        <div className='grid grid-cols-2'>
                            <div className="avatar ">
                                <div className="w-16 rounded-full">
                                    <img src={user?.photoURL} alt=""/>
                                </div>
                            </div>
                            <div>{user?.displayName}</div>
                        </div>

                        <td>{user?.role !== 'admin' && <button onClick={() => handleFriendRequest(user._id)} className='btn btn-xs btn-info'>Add Friend</button>}</td>
                        {/* <td><button className='btn btn-xs btn-denger'>Delete</button></td> */}
                    </tr>)
                }

            </div>
        </div>
    );
};

export default Peoples;