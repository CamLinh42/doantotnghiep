import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { dataRole } from '../../../helper/data';
import { db } from '../../../Firebase/Firebase.config';
import { collection, deleteDoc, doc, getDocs, orderBy, query, startAt, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../../Context/AuthProvider';
import { HospitalContext } from '../../../Context/HospitalProvider';
import { DepartmentContext } from '../../../Context/DepartmentProvide';
import AddUserNhanVien from './addUserNhanVien';

const AllUsers = () => {
  const { userDb ,users, listAllUsers, searchUser  } = useContext(AuthContext);
//   const { hospital, getHospital  } = useContext(HospitalContext);
//   const { department, getDepartment  } = useContext(DepartmentContext);
  const [idActive, setIdActive] = useState()
  const handleChangeRole = async (e) => {
    const userRef = doc(db, "users", idActive);
    await updateDoc(userRef, {role: e.target.value}).then((res) => {
    }).then(res => toast.success("Thành công"))
    listAllUsers()
  }
  const deleteUser = async (id, bl) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {block: !bl}).then((res) => {
        listAllUsers(userDb.hospital)
      toast.success("Thành công")
    })
  }
  const changeHospital = async (e) => {
    const userRef = doc(db, "users", idActive);
    await updateDoc(userRef, {hospital: e.target.value}).then((res) => {
        listAllUsers()
      toast.success("Thành công")
    })
  }
  const changeDepartment = async (e) => {
    const userRef = doc(db, "users", idActive);
    await updateDoc(userRef, {department: e.target.value}).then((res) => {
        listAllUsers()
      toast.success("Thành công")
    })
  }
  
  useEffect(() => {
    listAllUsers(userDb.hospital)
    // getHospital()
    // getDepartment()
  }, [])
    return (
        <div>
            <h2 className='text-2xl'>All Users</h2>
            <label
                htmlFor="modal22-toggle"
                className="btn btn-xs"
            >
        Thêm nhân viên
      </label>
            <AddUserNhanVien />
            {/* <input type="text" placeholder="Tìm kiếm " onChange={searchUser} className="input input-bordered input-secondary w-full mt-3 ml-2 max-w-xs" /> */}
            <div className="overflow-x-auto p-5">
                <table className="table w-full max-h-[calc(100vh-250px)]">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Tên</th>
                            <th>Email</th>
                            {/* <th>Vị trí</th> */}
                            {/* <th>Phòng khám</th> */}
                            {/* <th>Phòng Khoa</th> */}
                            <th>Hành động</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user, i) => 
                            (userDb?.role == 2 && user.role == 3 || userDb?.role == 3 && user.role == 1 ) &&
                            <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                {/* <td>
                                <div className="form-control w-full max-w-xs">
                                    <select onChange={handleChangeRole} onClick={() => setIdActive(user.id)} 
                                        disabled={userDb?.role == 4 && userDb.email == user.email}
                                        className="select select-bordered">
                                        {dataRole.map(item => (<option value={item.id}  selected={item.id == user?.role}>{item.name}</option>))}
                                    </select>
                                    </div>
                                </td> */}
                                {/* <td>
                                <div className="form-control w-full m-0">
                                    <select
                                        className="select select-primary select-bordered w-full "
                                        disabled={user?.role == 1 || user?.role == 4}
                                        onChange={changeHospital}
                                        onClick={() => setIdActive(user.id)}
                                    >
                                        <option>None</option>
                                        {hospital.map((item, index) => (
                                        <option selected={item.name == user.hospital} key={index} value={item.name}
                                        >
                                            {item.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
           
                                </td>
                                <td>
                                <div className="form-control w-full m-0">
                                    <select
                                        className="select select-primary select-bordered w-full "
                                        disabled={user?.role != 2}
                                        onChange={changeDepartment}
                                        onClick={() => setIdActive(user.id)}
                                    >
                                        <option>None</option>
                                        {department.map((item, index) => (
                                        <option selected={item.name == user.department}  key={index} value={item.name}>
                                            {item.name}
                                        </option>
                                        ))}
                                    </select>
                                    </div>
                                </td> */}
                                <td><button onClick={ () => deleteUser(user.id, !!user.block)} className='btn btn-xs btn-ghost'>{!user.block ? "Block" : "UnBlock"}</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;