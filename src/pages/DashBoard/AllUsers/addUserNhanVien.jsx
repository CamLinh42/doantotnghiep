import React, { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase.config";

export default function AddUserNhanVien() {
  const { createUser, updateUser, logOut, userDb } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddPhongKham = async (data) => {
    console.log(data,"check")
    createUser(data.email, data.matkhau)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("Sign Up seccessfully");
        // update profile
        const userInfo = {
          displayName: data.name,
          admin: false,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.matkhau, data.name);
          })
          .catch((error) => console.log());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveUser = async (name, email, password, hospital) => {
    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      password: password,
      role: 3,
      hospital: userDb.hospital,
    })
      .then((res) => {
        console.log(res, "res");
        toast("Tạo nhân viên thành công");
        logOut()
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  return (
    <div>
    
        <input type="checkbox" id="modal22-toggle" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box box-border">
            <form onSubmit={handleSubmit(handleAddPhongKham)}>
              <div className="form-control w-full m-0 box-border">
                <label className="label">
                  <span className="label-text">Tên nhân viên</span>
                </label>
                <input
                  type="name"
                  {...register("name", { required: "Name is required" })}
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
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  {...register("email", { required: "bắt buộc" })}
                  className="input input-primary input-bordered w-full"
                />
              </div>
              <div className="form-control w-full m-0">
                <label className="label">
                  <span className="label-text">Mật khẩu</span>
                </label>
                <input
                  type="text"
                  {...register("matkhau", { required: "bắt buộc" })}
                  className="input input-primary input-bordered w-full"
                />
              </div>

              <div className="modal-action justify-center">
                <label htmlFor="modal22-toggle" className="btn">
                  Hủy
                </label>
                <button type="submit" className="btn">
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
}
