import { format } from "date-fns";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider";
import { times } from "./data";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase.config";
import { DepartmentContext } from "../../../Context/DepartmentProvide";
import { DoctorContext } from "../../../Context/DoctorProvider";
import { HospitalContext } from "../../../Context/HospitalProvider";
import { AppointmentContext } from "../../../Context/AppointmentProvide";

const BookingModal = ({ valueBook, selectedDate }) => {
  const formRef = useRef(null);
  const { bacsi, name } = valueBook;
  console.log(valueBook, "VvalueBook")
  const [date, setDate] = useState(null)
  const { user, users,userDb, listAllUsers } = useContext(AuthContext);
  const { department, getDepartment } = useContext(DepartmentContext);
  const {doctor, getDoctor  } = useContext(DoctorContext);
  const {hospital, getHospital  } = useContext(HospitalContext);
  const modal = document.getElementById("booking-modal");
  const { appointment, getAppointment }=useContext(AppointmentContext);


  const activeBv = (e) => {
    getDoctor(e.target.value)
  }

  useEffect(() => {
    if(selectedDate){
      setDate(format(selectedDate, "dd/MM/yyyy"))
    } else {
      setDate(format(new Date(), "dd/MM/yyyy"))
    }
  },[selectedDate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data, "data")
    if(!data.email){
      toast.error("Đăng nhập")
      return
    }
    if(selectedDate){
    await addDoc(collection(db, "lichkhambenh"), {
      hospital: name,
      doctor: bacsi,
      date: date,
      email: user.email,
      hour: data.hour,
      name: data.name,
      note: data.note,
      phone: data.phone,
    })
      .then((res) => {
        toast.success("Thành công");
        if (modal.checked) {
          modal.checked = false;
        }
      })
      .catch((e) => {
        toast.error("Thất bại");
        console.log(e, "error");
      });
    } 
  };

  useEffect(() => {
    getDepartment();
    getHospital()
  }, []);

  useEffect(() => {
    listAllUsers(valueBook.name)
  }, [modal && modal.checked])

  return (
    <div className="p-3">
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-2"
          >
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Ngày tháng</span>
              </label>
              <input
                type="text"
                readOnly={selectedDate}
                defaultValue={date}
                className="input input-bordered input-success w-full "
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Chọn giờ</span>
              </label>
              <select
                name="hour"
                className="select select-bordered select-success w-full "
              >
                {times.map((slot, i) => (
                  <option value={slot} key={i}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Tên của bạn</span>
              </label>
              <input
                name="name"
                type="text"
                defaultValue={user?.displayName}
                placeholder="Full name"
                className="input input-bordered input-success w-full "
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Số điện thoại</span>
              </label>
              <input
                name="phone"
                type="number"
                required
                defaultValue={user?.phone}
                placeholder="Phone number"
                className="input input-bordered input-success w-full "
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Địa chỉ email</span>
              </label>
              <input
                name="email"
                type="email"
                defaultValue={user?.email}
                placeholder="Email"
                readOnly={selectedDate}
                className="input input-bordered input-success w-full"
              />
            </div>
            {!name &&   
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Phòng khám</span>
              </label>
              <select name="hospital" className="select select-primary select-bordered w-full " onChange={activeBv}>
                {hospital.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>}
            {/* <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Phòng khoa</span>
              </label>
              <select name="department" className="select select-primary select-bordered w-full ">
                {department.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Bác sĩ</span>
              </label>
              <input
                name="email"
                type="email"
                defaultValue={bacsi && bacsi}
                placeholder="Bác sĩ"
                readOnly={selectedDate}
                className="input input-bordered input-success w-full"
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label p-1">
                <span className="label-text">Ghi chú</span>
              </label>
              <input
                name="note"
                type="text"
                required
                placeholder="Ghi chú"
                className="input input-bordered input-success w-full"
              />
            </div>
            <input
              type="submit"
              id="submitF"
              className="btn btn-active btn-primary w-1 mt-4 text-white fixed opacity-0 visible"
            />
            <label htmlFor="submitF" className="btn btn-active btn-primary w-full mt-4 text-white">Xác nhận</label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
