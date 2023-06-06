import { addDoc, collection } from "firebase/firestore";
import React, { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { db, uploadFile } from "../../../Firebase/Firebase.config";
import { HospitalContext } from "../../../Context/HospitalProvider";
import { AuthContext } from "../../../Context/AuthProvider";
import { toast } from "react-hot-toast";

export default function AddHospital() {

  const { getHospital  } = useContext(HospitalContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [listImage, setListImage] = useState([]);
  const [err, setErr] = useState("")
  const { createUser, updateUser, logOut } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const handleAddPhongKham = async (data) => {
    setErr("");
    setTimeout( async ()=>{
      await addDoc(collection(db, "benhvien"), {
        name: data.name,
        phone: data.phone,
        address: data.address,
        chitiet:data.chitiet,
        anh:listImage,
        chuyenchua:data.chuyenchua,
        bacsi: data.bacsi
      }).then((res) => {

    setSignUpError("");
    createUser(data.email, data.matkhau)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("Sign Up seccessfully");
        // update profile
        const userInfo = {
          displayName: data.name,
          admin: false
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.matkhau, data.name);
          })
          .catch((error) => console.log());
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message);
      });




        console.log(res, "res")
        getHospital()
        const modal = document.getElementById("my-modal")
        if(modal.checked){
          modal.checked = false
        }
      }).catch(e => {console.log(e, "error")})
      setListImage([])
    },1000)

  }
  const saveUser = async (name, email, password, hospital) => {
    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      password: password,
      role: 2,
      hospital: hospital
    }).then((res) => {console.log(res, "res"); 
    toast("Tạo bác sĩ thành công");
    logOut()
  } 
    ).catch(e => {console.log(e, "error")})
  };
  const handleSaveImage = useCallback((e) => {
    const listFile = e.target.files;
    let arr = [];
    if(listFile.length){
      Object.values(listFile).forEach(file=>{
        try {
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
              const dataUrl = reader.result;
              const imageURL = await uploadFile(dataUrl)
              arr.push(imageURL)
            };
          }
        } catch (err) {
          console.error(err);
        }
      })
    }
    setListImage(arr)

  },[]);  
  console.log(listImage);
  return (
    <div className="box-border">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box box-border">
          <form onSubmit={handleSubmit(handleAddPhongKham)}>
            <div className="form-control w-full m-0 box-border">
              <label className="label">
                <span className="label-text">Tên Phòng khám</span>
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
                <span className="label-text">Số điện thoại</span>
              </label>
              <input
                type="number"
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
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Chuyên môn</span>
              </label>
              <input
                type="text"
                {...register("chuyenchua", { required: "bắt buộc" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.chuyenchua && (
                <p role="alert" className="text-red-600">
                  {errors.chuyenchua?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Chi tiết</span>
              </label>
              <input
                type="text"
                {...register("chitiet", { required: "chitiet is required" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.chitiet && (
                <p role="alert" className="text-red-600">
                  {errors.chitiet?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Bác sĩ</span>
              </label>
              <input
                type="text"
                {...register("bacsi", { required: "bắt buộc" })}
                className="input input-primary input-bordered w-full"
              />
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Hình ảnh</span>
              </label>
              <input
                type="file"
                className="input input-primary input-bordered w-full flex items-center"
                accept="image/*"
                multiple
                onChange={handleSaveImage}
              />
              {!!err && (
                <p role="alert" className="text-red-600">
                  {err}
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
              <label htmlFor="my-modal" className="btn" onClick={()=>setListImage([])}>Hủy</label>
              <button type="submit" className="btn">Xác nhận</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
