import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'

const InfoCards = () => {
    const cardData = [
        {
            id: 1,
            name: 'Đăng ký trực tuyến',
            discription: 'Bạn có thể đăng ký bất cứ lúc nào',
            icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'

        },
        {
            id: 2,
            name: 'Bất kỳ khu vực nào',
            discription: 'Bạn có thể chọn khu vực gần bạn',
            icon: marker,
            bgClass: 'bg-accent'

        },
        {
            id: 3,
            name: 'Nếu cần hướng dẫn',
            discription: '0999999999',
            icon: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'

        }
    ];
    return (
        <div className='grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                cardData.map(card => <InfoCard
                    key={card.id}
                    card={card}
                >

                </InfoCard>)
            }
        </div>
    );
};

export default InfoCards;