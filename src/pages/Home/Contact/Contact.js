import React from 'react';
import contact from '../../../assets/images/contact.png'
import { toast } from 'react-hot-toast';

const onSubmit = (e) => {
    toast.success("Thành Công")
    console.log(e.target)
    e.preventDefault();
}

const Contact = () => {
    return (
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-slate-800 text-gray-100">
            <div className="flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Trò chuyện!</h2>
                    <div className="dark:text-gray-400">Hãy gửi thư cho chúng tôi tại đây.</div>
                </div>
                <img src={contact} alt="" className="p-6 lg:w-80 h-52 md:h-64" />
            </div>
            <form onSubmit={onSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div>
                    <label for="name" className="text-sm">Tên của bạn</label>
                    <input id="name" type="text" placeholder="" className="w-full p-3 rounded dark:bg-gray-800 text-gray-900" />
                </div>
                <div>
                    <label for="email" className="text-sm">Địa chỉ email</label>
                    <input id="email" type="email" className="w-full p-3 rounded dark:bg-gray-800 text-gray-900" />
                </div>
                <div>
                    <label for="message" className="text-sm">Nội dung</label>
                    <textarea id="message" rows="3" className="w-full p-3 rounded dark:bg-gray-800 text-gray-900"></textarea>
                </div>
                <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-violet-400 dark:text-gray-900">Gửi thư</button>
            </form>
        </div>
    );
};

export default Contact;