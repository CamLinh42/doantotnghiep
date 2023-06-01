import React, { useContext, useEffect, useState } from "react";
import AddHospital from "./AddHospital";
import { HospitalContext } from "../../../Context/HospitalProvider";
import EditHospital from "./EditHospital";

export default function Hospital() {
  const { hospital, getHospital } = useContext(HospitalContext);
  const [valueEdit, setValueEdit] = useState(null)
  const [modal, setModal] = useState(false)
  const openEdit = (value) => {
    setValueEdit(value)
    setModal(!modal)
  }

  useEffect(() => {
    getHospital();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto max-h-[calc(100vh-250px)]">
        <table className="table w-full ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Điện thoại</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {hospital.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  {/* <div onClick={setValueEdit(item)}> */}
                  <label
                    htmlFor="edit-modal"
                    onClick={() => openEdit(item)}
                    className="btn btn-xs btn-outline btn-primary"
                    >
                    Chỉnh sửa
                  </label>
                    {/* </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <label htmlFor="my-modal" className="btn mt-5">
          Thêm Phòng khám
        </label>
        <AddHospital />
        <EditHospital valueEdit={valueEdit} />
    </div>
  );
}
