import React from 'react';
import fluoride from '../../../assets/images/fluoride.png'
import whitening from '../../../assets/images/whitening.png'
import cavity from '../../../assets/images/cavity.png'
import Service from './Service';

const Services = () => {
    const serviceData = [
        {
            id: 1,
            name: 'Hỏi đáp chuyên gia',
            // discription: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: fluoride,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'

        },
        {
            id: 2,
            name: 'Các kỹ thuật điều trị',
            // discription: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: cavity,
            bgClass: 'bg-accent'

        },
        {
            id: 3,
            name: 'Sổ tay sức khỏe',
            // discription: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: whitening,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'

        }
    ];
    return (
        <div>
            <div className='text-center m-10 p-5'>
                <h3 className='text-xl font-bold text-primary'>Dịch vụ</h3>
                <h2 className='text-2xl font-bold '>Dịch vụ chúng tôi cung cấp</h2>
            </div>
            <div className='grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    serviceData.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;