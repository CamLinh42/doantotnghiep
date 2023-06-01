import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import treatment from '../../../assets/images/treatment.png'

const Terms = () => {
    const navigate = useNavigate();
    return (
        <div className="hero mt-20">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} className="lg:w-1/3 rounded-lg shadow-2xl" alt=''/>
                <div className='m-10'>
                    <h1 className="text-5xl font-bold">Tận tâm chăm sóc, tận tình phục vụ</h1>
                    <p className="py-6">Lấy mục tiêu “Khách hàng là trung tâm”, chúng tôi luôn mong muốn mang đến cho người dân Việt Nam một địa chỉ chăm sóc sức khỏe uy tín, dịch vụ hoàn hảo, trở thành thương hiệu mạnh về Y tế, thu hút sự quan tâm và tin tưởng của người dân trong nước cũng như trong khu vực.</p>
                    <button onClick={() => navigate("./appointment")} className="text-white btn btn-primary bg-gradient-to-r from-primary to-secondary">Bắt đầu</button>
                </div>
            </div>
        </div>
    );
};

export default Terms;