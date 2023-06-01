import React from 'react';
import appointment from '../../../assets/images/appointment.png'
import doctor from '../../../assets/images/doctor.png'
import { useNavigate } from 'react-router-dom';

const MakeAppointment = () => {
    const navigate = useNavigate();
    return (
        <section>

            <div className="hero mt-20 ">
                <img src={appointment} style={{height:'550px'}} alt="" className='w-full'/>
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} className="w-1/2 -mt-40 rounded-lg hidden md:block" alt='' />
                    <div className='m-5'>
                        <h1 className='py-5 text-primary font-bold text-2xl'>Đặt ngay</h1>
                        <h1 className="text-5xl font-bold text-white">Đặt lịch hẹn ngay hôm nay</h1>
                        <p className="py-3 text-white">Là website Việt Nam uy tín nhất hiện nay đạt các chuẩn mực quốc tế về chất lượng y tế, chúng tôi luôn tiếp tục khẳng định quyết tâm trong mục tiêu xây dựng tiêu chuẩn chăm sóc sức khỏe hoàn toàn mới – chuyên nghiệp cho người dân Việt Nam.
🎐 Tại đây, đội ngũ nhân viên chăm sóc khách hàng được đào tạo bài bản, chuyên nghiệp được thể hiện thông qua cách mà khách hàng đã hài lòng về dịch vụ sau mỗi lần thăm khám chữa bệnh.</p>
                        <button onClick={() => navigate("./appointment")} className="text-white btn btn-primary bg-gradient-to-r from-primary to-secondary">Bắt đầu</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;