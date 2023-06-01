import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../assets/images/footer.png'

const Footer = () => {
    return (
        <footer 
        style={{
            background:`url(${footer})`,
            backgroundSize:'cover'
    }}
        className=" p-10 " >
            <div className='footer'>
                <div>
                    <span className="footer-title">Dịch vụ</span>
                    <Link className="link link-hover">Khám bệnh</Link>
                    <Link className="link link-hover">Đặt lịch</Link>
                    <Link className="link link-hover">Thanh toán</Link>
                    <Link className="link link-hover">Chi tiết</Link>
                </div>
                <div>
                    <span className="footer-title">Công ty</span>
                    <Link className="link link-hover">Về chúng tôi</Link>
                    <Link className="link link-hover">Liên hệ</Link>
                    <Link className="link link-hover">Công việc</Link>
                    <Link className="link link-hover">Báo chí</Link>
                </div>
                <div>
                    <span className="footer-title">Chính sách</span>
                    <Link className="link link-hover">Điều khoản sử dụng</Link>
                    <Link className="link link-hover">Chính sách bảo mật</Link>
                    <Link className="link link-hover">chính sách cookie</Link>
                </div>
            </div>
            <div className='text-center mt-20'>
                <p>Copyright © 2022</p>
            </div>
        </footer>
    );
};

export default Footer;