import React from 'react';

const AvailableAppointmentCard = ({ hospital, setValueBook }) => {
    const { name, address } = hospital;
    return (
        <div>
            <div className="card shadow-xl text-center">
                <div className="card-body ">
                    <h2 className="text-xl font-bold text-secondary">{name}</h2>
                    <p>{address}</p>
                    <div className="card-actions ">
                        <label onClick={() => setValueBook(hospital)} htmlFor="booking-modal" className="btn btn-primary w-full text-white">Đặt lịch ngay</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableAppointmentCard;