import React, { useContext, useEffect, useState } from "react";
import { DepartmentContext } from "../../../Context/DepartmentProvide";
import AddDepartment from "./AddDepartment";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase.config";
import { toast } from "react-hot-toast";

export default function Department() {
  const { department, getDepartment  } = useContext(DepartmentContext);

  const delItem = async (id) => {
    await deleteDoc(doc(db, "phongkhoa", id)).then((res) => {
      toast.success("Thành công")
      getDepartment()
    })
  }

  useEffect(() => {
    getDepartment()
  },[])

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Chuyên môn</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {department.map((item, index) => 
            <tr key={index}>
              <th>{index}</th>
              <td>{item.name}</td>
              <td>{item.specializing}</td>
              <td><button onClick={ () => delItem(item.id)} className="btn btn-xs">Xóa</button></td>
            </tr>)}
          </tbody>
        </table>
        <label htmlFor="my-modal" className="btn mt-5">
          Thêm Khoa
        </label>
        <AddDepartment />
      </div>
    </div>
  );
}
