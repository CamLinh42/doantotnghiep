import { useContext, useEffect } from "react";
import { DoctorContext } from "../../../Context/DoctorProvider";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase.config";
import { HospitalContext } from "../../../Context/HospitalProvider";
import { DepartmentContext } from "../../../Context/DepartmentProvide";

export default function AddHospital() {
  const { getDoctor } = useContext(DoctorContext);
  const { hospital, getHospital  } = useContext(HospitalContext);
  const { department, getDepartment  } = useContext(DepartmentContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddDoctor = async (data) => {
    console.log(data, "data")
    await addDoc(collection(db, "bacsi"), {
      name: data.name,
      phone: data.phone,
      email: data.email,
      hospital: data.hospital,
      department: data.department
    })
      .then((res) => {
        getDoctor();
        const modal = document.getElementById("my-modal");
        if (modal.checked) {
          modal.checked = false;
        }
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  useEffect(() => {
    getHospital()
    getDepartment()
  }, [])

  return (
    <div className="box-border">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box box-border">
          <form onSubmit={handleSubmit(handleAddDoctor)}>
            <div className="form-control w-full m-0 box-border">
              <label className="label">
                <span className="label-text">Tên bác sĩ</span>
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
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.email && (
                <p role="alert" className="text-red-600">
                  {errors.email?.message}
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
                <span className="label-text">Phòng khám</span>
              </label>
              <select
                {...register("hospital", {
                  required: "Hospital is required",
                })}
                className="select select-primary select-bordered w-full "
              >
                {hospital.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full m-0">
              <label className="label">
                <span className="label-text">Phòng khoa</span>
              </label>
              <select
                {...register("department", {
                  required: "Department is required",
                })}
                className="select select-primary select-bordered w-full "
              >
                {department.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

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
              <label htmlFor="my-modal" className="btn">
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
