import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HospitalContext } from "../../../Context/HospitalProvider";
import { db } from "../../../Firebase/Firebase.config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function EditHospital({valueEdit}) {

  const { getHospital  } = useContext(HospitalContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleEdit = async(data) => {
    const userRef = doc(db, "phongkham", valueEdit.id);
    await updateDoc(userRef,  {status: "chapnhan"}).then((res) => {
      success()
    })
  }

  const handleDelete = async(data) => {
    const userRef = doc(db, "phongkham", valueEdit.id);
    await updateDoc(userRef, {status: "tuchoi"}).then((res) => {
      success()
    })
  }

  const success = () => {
    getHospital()
    const modal = document.getElementById("edit-modal")
    if(modal.checked){
      modal.checked = false
    }
  }
  useEffect(() => {
    console.log("mounted")
  },[])

  console.log(valueEdit, "valueEdit")

  return (
    <div className="box-border">
      <input type="checkbox" id="edit-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box box-border">
          <form onSubmit={handleSubmit(handleEdit)}>
            <div className="form-control w-full m-0 box-border">
              <label className="label">
                <span className="label-text">Tên Phòng khám</span>
              </label>
              <input
                type="name"
                defaultValue={valueEdit?.name}
                className="input input-primary input-bordered w-full box-border"
                readOnly
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Số điện thoại</span>
              </label>
              <input
                type="number"
                defaultValue={valueEdit?.phone}
                className="input input-primary input-bordered w-full"
                readOnly
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Địa chỉ</span>
              </label>
              <input
              defaultValue={valueEdit?.address}
                type="text"
                className="input input-primary input-bordered w-full"
                readOnly
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Chuyên khám</span>
              </label>
              <input
              defaultValue={valueEdit?.chitiet}
                type="text"
                className="input input-primary input-bordered w-full"
                readOnly
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Chuyên môn</span>
              </label>
              <input
              defaultValue={valueEdit?.chuyenchua}
                type="text"
                className="input input-primary input-bordered w-full"
                readOnly
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Bác sĩ</span>
              </label>
              <input
              defaultValue={valueEdit?.bacsi}
                type="text"
                className="input input-primary input-bordered w-full"
                readOnly
              />
            </div>
            <div className="modal-action justify-center pt-10">
              <label htmlFor="edit-modal" className="btn">Hủy</label>
              <button type="submit" className="btn">Xác nhận</button>
              <label htmlFor="delete-modal" className="btn">Từ chối</label>
            </div>
          </form>
              <button id="delete-modal" onClick={()=> handleDelete("delete")} className="btn btn-secondary h-1 w-1 p-0 m-0 text-white invisible">Xóa</button>
        </div>
      </div>
    </div>
  );
}
