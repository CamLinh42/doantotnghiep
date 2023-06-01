import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HospitalContext } from "../../../Context/HospitalProvider";
import { db } from "../../../Firebase/Firebase.config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function EditHospital({valueEdit}) {

  const { getHospital  } = useContext(HospitalContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleEdit = async(data) => {
    console.log(data, "check")
    const userRef = doc(db, "benhvien", valueEdit.id);
    await updateDoc(userRef, data).then((res) => {
      success()
    })
  }

  const handleDelete = async(data) => {
    console.log(data, "check")
    await deleteDoc(doc(db, "benhvien", valueEdit.id)).then((res) => {
      console.log(res, "resres")
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
                {...register("name", { required: "Name is required" })}
                defaultValue={valueEdit?.name}
                className="input input-primary input-bordered w-full box-border"
              />
              {errors.name && (
                <p role="alert" className="text-red-600">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Số điện thoại</span>
              </label>
              <input
                type="number"
                defaultValue={valueEdit?.phone}
                {...register("phone", { required: "Phone is required" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.phone && (
                <p role="alert" className="text-red-600">
                  {errors.phone?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Địa chỉ</span>
              </label>
              <input
              defaultValue={valueEdit?.address}
                type="text"
                {...register("address", { required: "Address is required" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.address && (
                <p role="alert" className="text-red-600">
                  {errors.address?.message}
                </p>
              )}
            </div>
            <div className="modal-action justify-center pt-10">
              <label htmlFor="edit-modal" className="btn">Hủy</label>
              <button type="submit" className="btn">Xác nhận</button>
              <label htmlFor="delete-modal" className="btn">delete</label>
            </div>
          </form>
              <button id="delete-modal" onClick={()=> handleDelete("delete")} className="btn btn-secondary h-1 w-1 p-0 m-0 text-white invisible">Xóa</button>
        </div>
      </div>
    </div>
  );
}
