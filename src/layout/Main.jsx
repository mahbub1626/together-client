import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Pages/Share/Footer/Footer';
import Nav from '../Pages/Share/Nav/Nav';

const Main = () => {
    return (
        <div className='max-w-[1440px] mx-auto'>
            
                <Nav></Nav>

                <div className="drawer drawer-mobile">
                    <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                            <li><Link to='/newsfeed'>News Feed</Link></li>

                            {
                                <>
                                    <li><Link to='/peoplenearby'>People Nearby</Link></li>
                                    <li><Link to='/friends'>Friends</Link></li>
                                    
                                </>
                            }
                        </ul>

                    </div>
                </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;