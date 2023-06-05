import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AvailableAppointmentCard = ({ hospital, setValueBook }) => {
    const { bacsi, name, address } = hospital;
    const navigate = useNavigate();

    return (
        <div>
            <div className="card shadow-xl text-center">
                <div className="card-body ">
                    <h2 className="text-xl font-bold text-secondary">{name}</h2>
                    <p>{address}</p>
                    <div className="card-actions ">
                        <label onClick={() => setValueBook(hospital)} htmlFor="booking-modal" className="btn btn-primary w-full text-white">Đặt lịch ngay</label>
                        <label onClick={()=> navigate(`/detail/${name}`)} className="btn btn-primary w-full text-white">
                            Chi tiết bệnh viện
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableAppointmentCard;