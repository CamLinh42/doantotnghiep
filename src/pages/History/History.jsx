import React, { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../Context/AppointmentProvide";
import { AuthContext } from "../../Context/AuthProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/Firebase.config";
import { toast } from "react-hot-toast";

export default function History() {
  const { appointment, getAppointment } = useContext(AppointmentContext);
  const { userDb, users, listAllUsers, searchUser } = useContext(AuthContext);
  const modal = document.getElementById("my_modal_62");

  const [activeRate, setActiveRate] = useState();
  const danhgia = async () => {
    await addDoc(collection(db, "binhluan"), {
      tenNguoiDanhGia: activeRate.ten,
      benhviendanhgia: activeRate.bv,
      noidung: document.getElementById("danhGiaInput").value,
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
  };
  useEffect(() => {
    console.log(userDb, "userDb");
    getAppointment(userDb?.email);
  }, []);
  return (
    <div>
      <h2 className="text-2xl px-10">Danh sách lịch khám bệnh</h2>
      <div className="overflow-x-auto p-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên</th>
              <th>Thời gian</th>
              <th>Ngày</th>
              <th>Bệnh viện</th>
              <th>Khoa</th>
              <th>Bác sĩ</th>
              <th>Số điện thoại</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userDb &&
              appointment.map((item, i) => (
                <tr key={item.id}>
                  <th>{i + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.hour}</td>
                  <td>{item.date}</td>
                  <td>{item.hospital}</td>
                  <td>{item.department}</td>
                  <td>{item.doctor}</td>
                  <td>{item.phone}</td>
                  <td>{item.note}</td>
                  <td>
                    {item.trangthai
                      ? item.trangthai == 1
                        ? "Đã xác nhận"
                        : item.trangthai == 2
                        ? "Đã khám"
                        : ""
                      : "Chờ xác nhận"}
                  </td>
                  <td>
                    <label
                      disabled={item.trangthai != 2}
                      onClick={() =>
                        setActiveRate({ ten: item.name, bv: item.hospital })
                      }
                      htmlFor="my_modal_62"
                      className="btn btn-xs"
                    >
                      Đánh giá
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <input type="checkbox" id="my_modal_62" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Đánh giá!</h3>
            <input
              className="input input-primary input-bordered w-full mb-6"
              id="danhGiaInput"
              placeholder="Nội dung đánh giá"
            />
            <div className="flex justify-around">
              <label htmlFor="my_modal_62" className="btn">
                Close!
              </label>
              <button className="btn" onClick={() => danhgia()}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
