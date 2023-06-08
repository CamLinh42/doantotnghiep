import React, { useContext, useEffect } from 'react';
import { HospitalContext } from '../../../Context/HospitalProvider';
import { AppointmentContext } from '../../../Context/AppointmentProvide';
import { AuthContext } from '../../../Context/AuthProvider';

const ThongKe = () => {
  const { hospital, getHospital } = useContext(HospitalContext);
    const { appointment, getAppointment, counta, lengthca }=useContext(AppointmentContext);
    const { userDb ,users, listAllUsers, searchUser,  lengthc,
        count  } = useContext(AuthContext);
    useEffect(() => {
        count()
        counta()
    getHospital();
    getAppointment()
  }, []);
  console.log(appointment, "userDbuserDbuserDb")
    return (
        <div>
            <div>
            Số phòng khám: {hospital?.length}
            </div>
            <div>
            Số lịch khám: {lengthca}
            </div>
            <div>
            Số Người đăng kí: {lengthc}
            </div>
        </div>
    );
}

export default ThongKe;
