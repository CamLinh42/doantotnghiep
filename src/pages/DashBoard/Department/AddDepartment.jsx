import { useContext } from "react";
import { DepartmentContext } from "../../../Context/DepartmentProvide";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase.config";


export default function AddDepartment() {

  const { getDepartment  } = useContext(DepartmentContext);

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handleAddDepartment = async (data) => {
    console.log(data, "data")
    await addDoc(collection(db, "phongkhoa"), {
      name: data.name,
      specializing: data.specializing,
    }).then((res) => {
      console.log(res, "res")
      getDepartment()
      const modal = document.getElementById("my-modal")
      if(modal.checked){
        modal.checked = false
      }
    }).catch(e => {console.log(e, "error")})
  }
  return (
    <div className="box-border">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box box-border">
          <form onSubmit={handleSubmit(handleAddDepartment)}>
            <div className="form-control w-full m-0 box-border">
              <label className="label">
                <span className="label-text">Tên khoa</span>
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
                <span className="label-text">Chuyên môn</span>
              </label>
              <input
                type="text"
                {...register("specializing", { required: "Specializing is required" })}
                className="input input-primary input-bordered w-full"
              />
              {errors.phone && (
                <p role="alert" className="text-red-600">
                  {errors.specializing?.message}
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
              <label htmlFor="my-modal" className="btn">Hủy</label>
              <button type="submit" className="btn">Xác nhận</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
