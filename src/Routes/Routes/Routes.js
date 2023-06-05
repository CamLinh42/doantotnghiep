import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import AllUsers from "../../pages/DashBoard/AllUsers/AllUsers";
import DashBoard from "../../pages/DashBoard/DashBoard/DashBoard";
import MyAppointment from "../../pages/DashBoard/MyAppointment/MyAppointment";
import Payment from "../../pages/DashBoard/Payment/Payment";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Hopital from "../../pages/DashBoard/Hopital/Hopital";
import Department from "../../pages/DashBoard/Department/Department";
import Doctor from "../../pages/DashBoard/Doctor/Doctor";
import History from "../../pages/History/History";
import Detail from "../../pages/Detail/Detail";
import DoctorDetail from "../../pages/Detail/DoctorDetail";
import Info from "../../pages/Info/Info";
import DangKiPhongKham from "../../pages/Dangkiphongkham/DangKiPhongKham";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/appointment', element: <Appointment></Appointment> },
            { path: '/login', element: <Login></Login> },
            { path: '/signup', element: <SignUp></SignUp> },
            { path: '/history', element: <History></History> },
            { path: '/info', element: <Info></Info> },
            { path: '/dangkiphongkham', element: <DangKiPhongKham></DangKiPhongKham> },
            { path: '/detail/:phongkham', element: <Detail></Detail> },
            { path: '/detail/doctor/:phongkham', element: <DoctorDetail></DoctorDetail> },

        ]
    },
    {
        path: '/dashboard', element: <PrivateRoute> <DashBoardLayout></DashBoardLayout></PrivateRoute>,
        errorElement:<DisplayError></DisplayError>,
        children: [
            { path: '/dashboard', element: <MyAppointment></MyAppointment> },
            { path: '/dashboard/benhvien', element:<AdminRoute><Hopital></Hopital></AdminRoute>},
            { path: '/dashboard/khoa', element:<AdminRoute><Department></Department></AdminRoute>},
            { path: '/dashboard/allusers', element:<AdminRoute><AllUsers></AllUsers></AdminRoute>},
            { path: '/dashboard/bacsi', element:<AdminRoute><Doctor></Doctor></AdminRoute>},

            { path: '/dashboard/payment/:id', element:<Payment></Payment>,
            // loader: ({params})=> fetch(`https://doctors-portal-server-ten-vert.vercel.app/bookings/${params.id}`)
        },
        ]
    }
])

export default router;