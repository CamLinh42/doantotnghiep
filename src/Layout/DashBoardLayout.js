
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthProvider';
const DashBoardLayout = () => {
    const { user, logOut, userDb } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if(userDb?.role == 4){
            navigate('/dashboard/benhvien')
        }
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile max-h-[calc(100vh-64px)]">
                <input id="dashBoard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashBoard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {(userDb?.role == 2 || userDb?.role == 3) && 
                            <li className='my-1'><Link to='/dashboard'>Danh sách Lịch</Link></li>
                        }
                        {(userDb?.role == 2) && 
                            <li className='my-1'><Link to='/dashboard/allusers'>Người dùng</Link></li> 
                        }
                        {/* <li className='my-1'><Link to='/dashboard/bacsi'>Bác sĩ</Link></li> */}
                        {userDb?.role == 4 && <>
                        {/* <li className='my-1'><Link to='/dashboard/allusers'>Người dùng</Link></li> */}
                        <li className='my-1'><Link to='/dashboard/benhvien'>Phòng khám</Link></li>
                        {/* <li className='my-1'><Link to='/dashboard/khoa'>Khoa</Link></li> */}
                        </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;