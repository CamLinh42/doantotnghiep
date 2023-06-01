import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import TestimonialCard from './TestimonialCard';



const Testimonial = () => {
    const testimonialData=[
        {
            id:1,
            name:'Anh Ngọc Hưng',
            review:'Đây đúng thật là một dịch vụ tốt, nhanh chóng, tiết kiệm thời gian và luôn uy tín',
            img:people1,
            location:'Quận Sơn Trà'
        },
        {
            id:2,
            name:'Chị Thủy An',
            review:'Đây đúng thật là một dịch vụ tốt, nhanh chóng, tiết kiệm thời gian và luôn uy tín',
            img:people2, 
            location:'Quận Ngũ Hành Sơn'
        },
        {
            id:3,
            name:'Chị Bảo Ngọc',
            review:'Đây đúng thật là một dịch vụ tốt, nhanh chóng, tiết kiệm thời gian và luôn uy tín',
            img:people3,
            location:'Quận Thanh Khê'
        }
    ];
    return (
        <section className='my-16'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='text-lg text-primary font-bold p-3'>Đánh giá</h4>
                    <h2 className='text-4xl font-bold p-3'>Bệnh nhân của chúng tôi nói gì</h2>
                </div>
                <div>
                    <img src={quote} alt="" className='lg:w-48 w-24'/>
                </div>
            </div>

            <div className='grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    testimonialData.map(tsmData=> <TestimonialCard
                    key={tsmData.id}
                    tsmData={tsmData}
                    ></TestimonialCard>)
                }
            </div>
        </section>
    );
};

export default Testimonial;