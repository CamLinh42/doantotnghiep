import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import { AppointmentContext } from '../../../Context/AppointmentProvide';
import BookingModal from '../../Appointment/BookingModal/BookingModal';
import { db } from '../../../Firebase/Firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const MyAppointment = () => {
    const { appointment, getAppointment }=useContext(AppointmentContext);
    const { user, logOut, userDb } = useContext(AuthContext)

console.log(appointment, "appointment")

const changeStatus = async (id, status) => {
    const userRef = doc(db, "lichkhambenh", id);
    await updateDoc(userRef, {trangthai: status ? 2 : 1}).then((res) => {
    }).then(res => toast.success("Thành công"))
    getData()
}

const getData = () => {
    if(userDb){
        if(userDb?.role == 2){
            getAppointment(null, null, userDb.name)
        } else if( userDb?.role == 3) {
            getAppointment(null, userDb.hospital, null)
        }
    }
}
 useEffect(() => {
    getData()
 }, [userDb])
    return (
        <div className="max-h-calc(100%-20px)">
            <h2 className='text-2xl px-10 flex gap-2'>Danh sách lịch khám bệnh {userDb?.role == 3 ? <div>{userDb?.hospital}</div> : ''}</h2>
           
            {/* <label htmlFor="booking-modal" className="btn mt-3 mx-10">Đặt lịch ngay</label> */}
            <BookingModal valueBook={{}} selectedDate={null} />
            <div className="overflow-x-auto p-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Tên</th>
                            <th>Thời gian</th>
                            <th>Ngày</th>
                            {userDb?.role == 2 && <th>Bệnh viện</th>}
                            <th>Khoa</th>
                            <th>Bác sĩ</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Ghi chú</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {appointment.map((item, i )=> <tr key={item.id}>
                        <th>{i+1}</th>
                        <td>{item.name}</td>
                        <td>{item.hour}</td>
                        <td>{item.date}</td>
                        {userDb?.role == 2 && <td>{item.hospital}</td>}
                        <td>{item.department}</td>
                        <td>{item.doctor}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.note}</td>
                        <td><button disabled={(userDb?.role != 3  || (item.trangthai == 2) )} 
                        className={`btn btn-xs ${item.trangthai && 'text-white'} `} onClick={() => {changeStatus(item.id, item.trangthai)}}>{!item.trangthai ? "Cho Khám" : item.trangthai === 1 ? "Đã khám" : "Đã khám xong"}</button></td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;