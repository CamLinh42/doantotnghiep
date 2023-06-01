import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Navbar = () => {
    const { user, logOut, userDb } = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        if(userDb?.role != 1 && user){
            navigate('/dashboard')
        }
    },[user, userDb])

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const menuItem = <>
       {userDb && userDb?.role == 1 && <li><Link className='btn btn-ghost' to='/'>Home</Link></li>}
       {userDb && userDb?.role == 1 &&<li><Link className='btn btn-ghost' to='/appointment'>Đặt lịch</Link></li>}
        {userDb && userDb?.role == 1 && <li><Link className='btn btn-ghost' to='/history'>Lịch sử</Link></li>}


        {user?.uid ?
            <>
                {userDb?.role == 2 && <li><Link className='btn btn-ghost' to='/dashboard'>Quản lý</Link></li>}
                {userDb?.role == 3 && <li><Link className='btn btn-ghost' to='/dashboard'>Quản lý</Link></li>}
                {userDb?.role == 4 && <li><Link className='btn btn-ghost' to='/dashboard'>Quản lý</Link></li>}
                <li>
                    <div className="dropdown p-0">
                        <label tabIndex={0} className="btn">{user.displayName || userDb.name}</label>
                        <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box top-16 right-0">
                            <li><a>{user.email}</a></li>
                            <li className='flex items-center'><Link onClick={handleLogOut} className='btn btn-ghost flex items-center w-full'>Đăng xuất</Link></li>
                        </ul>
                    </div>
                </li>

            </>
            :
            <li><Link className='btn btn-ghost' to='/login'>Login</Link></li>
        }

    </>

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">Da Nang Doctor</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItem}
                </ul>
            </div>
            <label htmlFor="dashBoard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;