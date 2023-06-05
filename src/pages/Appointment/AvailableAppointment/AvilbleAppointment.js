import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext, useState, useEffect } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AvailableAppointmentCard from './AvailableAppointmentCard';
import { HospitalContext } from '../../../Context/HospitalProvider';

const AvilbleAppointment = ({ selectedDate, setSelectedDate }) => {
    const [valueBook, setValueBook] = useState(null);
    const date = format(selectedDate, 'PP');
    // const [isLoading, setIsLoading] = useState(false)
    // react query
  const { hospital, getHospital  } = useContext(HospitalContext);


  const searchBv = (e) => {
    getHospital(e.target.value)
  }

  useEffect(() => {
    getHospital()
  }, [])

    return (
        <section>
            <div className='mx-auto text-center text-secondary font-bold text-xl p-3 mt-10'>
                <p className='text-center text-secondary font-bold text-xl p-3 mt-10'>Bạn đã chọn ngày: {format(selectedDate, "dd/MM/yyyy")}</p>
                {/* <input type="text" onChange={searchBv} placeholder="Tìm bệnh viện" className="input input-bordered w-full max-w-xs" /> */}
            </div>
            <div className='grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    hospital.map(item => item.status == "chapnhan" &&
                    <AvailableAppointmentCard
                        key={item.id}
                        hospital={item}
                        setValueBook={setValueBook}
                    ></AvailableAppointmentCard>)
                }
            </div>
            {valueBook &&
                <BookingModal
                    valueBook={valueBook}
                    selectedDate={selectedDate}
                >

                </BookingModal>
            }
        </section>
    );
};

export default AvilbleAppointment;