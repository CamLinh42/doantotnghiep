import React, { useContext, useEffect, useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvilbleAppointment from '../AvailableAppointment/AvilbleAppointment';
import { AuthContext } from '../../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user, logOut, userDb } = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {   
        if(!userDb || !userDb?.email){
            navigate("/login")
        }
    }, [])
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AvilbleAppointment
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AvilbleAppointment>
        </div>
    );
};

export default Appointment;