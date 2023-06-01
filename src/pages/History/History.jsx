import React, { useContext, useEffect } from 'react'
import { AppointmentContext } from '../../Context/AppointmentProvide';
import { AuthContext } from '../../Context/AuthProvider';

export default function History() {
    const { appointment, getAppointment }=useContext(AppointmentContext);
  const { userDb ,users, listAllUsers, searchUser  } = useContext(AuthContext);

    useEffect(() => {
        getAppointment(userDb?.email)
    },[])
  return (
    <div>
    <h2 className='text-2xl px-10'>Danh sách lịch khám bệnh</h2>
    <div className="overflow-x-auto p-5">
        <table className="table w-full">
            <thead>
                <tr>
                    <th>Stt</th>
                    <th>Tên</th>
                    <th>Thời gian</th>
                    <th>Ngày</th>
                    <th>Bệnh viện</th>
                    <th>Khoa</th>
                    <th>Bác sĩ</th>
                    <th>Số điện thoại</th>
                    <th>Ghi chú</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
            {userDb && appointment.map((item, i )=> <tr key={item.id}>
                <th>{i+1}</th>
                <td>{item.name}</td>
                <td>{item.hour}</td>
                <td>{item.date}</td>
                <td>{item.hospital}</td>
                <td>{item.department}</td>
                <td>{item.doctor}</td>
                <td>{item.phone}</td>
                <td>{item.note}</td>
                <td>{item.trangthai ? (item.trangthai == 1 ? "Đã xác nhận" : item.trangthai == 2 ? "Đã khám" : "") : "Chờ xác nhận"}</td>
            </tr>)}
            </tbody>
        </table>
    </div>
</div>
  )
}
