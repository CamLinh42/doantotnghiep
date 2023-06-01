import React, { useContext, useEffect, useState } from "react";
import AddDoctor from "./AddDoctor";
import { DoctorContext } from "../../../Context/DoctorProvider";

export default function Doctor() {

  const { doctor, getDoctor  } = useContext(DoctorContext);

  useEffect(() => {
    getDoctor()
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
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Phòng khám</th>
              <th>Phòng khoa</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {doctor.map((item, index) => 
            <tr key={index}>
              <th>{index}</th>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.hospital}</td>
              <td>{item.department}</td>
              {/* <td>{item.phone}</td>
              <td>{item.phone}</td> */}
            </tr>)}
          </tbody>
        </table>
        <label htmlFor="my-modal" className="btn mt-5">
          Thêm bác sĩ
        </label>
        <AddDoctor />
      </div>
    </div>
  );
}
