import { addDoc, collection } from "firebase/firestore";
import React, { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { db, uploadFile } from "../../../Firebase/Firebase.config";
import { HospitalContext } from "../../../Context/HospitalProvider";

export default function AddHospital() {

  const { getHospital  } = useContext(HospitalContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [listImage, setListImage] = useState([]);
  const [err, setErr] = useState("")

  const handleAddDoctor = async (data) => {
    setErr("");
    setTimeout( async ()=>{
      await addDoc(collection(db, "benhvien"), {
        name: data.name,
        phone: data.phone,
        address: data.address,
        chitiet:data.chitiet,
        anh:listImage,
        chuyenchua:data.chuyenchua
      }).then((res) => {
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
          <form onSubmit={handleSubmit(handleAddDoctor)}>
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
            {/* <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.email && (
                <p role="alert" className="text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div> */}
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
                <span className="label-text">Chi tiết phòng khám</span>
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
                <span className="label-text">Ảnh phòng khám</span>
              </label>
              <input
                type="file"
                className="input input-primary input-bordered w-full"
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
                <span className="label-text">Chuyên chữa các bệnh</span>
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


            {/* <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Specialty</span>
              </label>
              <select
                {...register("specialty", {
                  required: "Specialty is required",
                })}
                className="select select-primary select-bordered w-full "
              >
                <option disabled selected>
                  Please select a Specialty
                </option>
                {
                  specialtys.map(specialty => <option
                      key={specialty._id}
                      value={specialty.name}
                  >{specialty.name}</option>)
              }
              </select>
            </div> */}

            {/* <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="file"
                {...register("img", { required: "Photo is required" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.img && (
                <p role="alert" className="text-red-600">
                  {errors.img?.message}
                </p>
              )}
            </div> */}

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
