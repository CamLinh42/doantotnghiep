import React from 'react';
import chair from '../../../assets/images/chair.png'
import bg from '../../../assets/images/bg.png'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="hero">
        <img src={bg} alt='' className=" rounded-lg "></img>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt=''/>
                <div>
                    <h1 className="text-5xl font-bold">Đăng ký khám bệnh!</h1>
                    <p className="py-6">Đăng ký khám bệnh online - thủ tục nhanh chóng - tiện lợi - tiết kiệm thời gian.</p>
                    <button onClick={() => navigate("./appointment")} className="text-white btn btn-primary bg-gradient-to-r from-primary to-secondary">Bắt đầu</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;