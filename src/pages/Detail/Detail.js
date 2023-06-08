import { useContext, useEffect, useState } from "react";
import { HospitalContext } from "../../Context/HospitalProvider";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../Context/DoctorProvider";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Firebase.config";
import TestimonialCard from "../Home/Testimonial/TestimonialCard";

export default function Detail() {
  const { getHospitalByName, hospitalByName } = useContext(HospitalContext);
  const { doctor, getDoctorByHospital } = useContext(DoctorContext);
  const { phongkham } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);
  const getBinhLuan = async (bv) => {
    const all = [];
    let querySnapshot;
    if (bv) {
      console.log(bv, "bvbvbvbvbv2")
      const citiesRef = collection(db, "binhluan");
      const q = query(citiesRef, where("phongkhamdanhgia", "==", bv));
      querySnapshot = await getDocs(q);
    }
    querySnapshot.docs.forEach((item) => {
      const row = item.data();
      row.id = item.id;
      all.push(row);
    });
    setComment(all);
    console.log(comment, "comment");
  };

  useEffect(() => {
    getHospitalByName(phongkham);
    getDoctorByHospital(phongkham);

    getBinhLuan(phongkham);
  }, []);
  console.log(hospitalByName, "hospitalByName");
  return (
    <div className="">
      {phongkham && (
        <div className="">
          <div className=" flex w-full">
        

            {hospitalByName.map((hospital, _) => {
              return (
                <div className="bg-gray-100 p-8 rounded-lg shadow-md w-1/2 mx-20">
                  <h1 className="text-2xl font-bold text-blue-600 mb-4">
                    Phòng khám: {hospital.name}
                  </h1>
                  <div className="border p-6 rounded-md bg-white">
                    <h1 className=" font-bold mb-2 text-xl">
                      Bác sỹ: {hospital.bacsi}
                    </h1>
                    <h1 className=" text-lg mb-2 text-gray-700 ">
                      Chuyên khám: {hospital.chitiet}
                    </h1>
                    <h1 className="text-lg text-gray-700 mb-2">
                      Chuyên chữa: {hospital.chuyenchua}
                    </h1>
                    <h1 className="text-lg text-gray-700 mb-2">
                      Địa chỉ: {hospital.address}
                    </h1>
                    <h1 className="text-lg text-gray-700">
                      Số điện thoại: {hospital.phone}
                    </h1>
                  </div>
                  <div className="flex justify-center mt-10">
                  {/* <img
                    key={_}
                    src={hospitalByName[0].anh[0]}
                    className="max-w-sm rounded-lg shadow-2xl"
                    /> */}
                    </div>
                </div>
              );
            })}
                <div className="w-1/2 flex flex-col items-center">
            {hospitalByName.map((images, _) => {
              return images.anh.map((image, _) => {
                return (
                  <img
                    key={_}
                    src={image}
                    className="max-w-sm rounded-lg shadow-2xl"
                  />
                );
              });
            })}
            </div>
          </div>
          <h1 className="flex flex-col w-full text-2xl text-center mt-10">Bình luận</h1>

          <div className="flex flex-col w-full border-opacity-50 mb-20">
            <div className='mt-6  gap-4 flex flex-wrap justify-center'>
                {
                    comment.map(item=> <div className="card w-96 bg-base-100 shadow-2xl">
                    <div className="card-body">
                        
                        <p>{item.tenNguoiDanhGia}</p>
                        <div className="flex items-center">
                            <div className="avatar mr-5 my-5">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                </div>
                            </div>
                            <div>
                                <p className=''>{item.noidung}</p>
                            </div>
                        </div>
                    </div>
                </div>)
                }
            </div>
          </div>
        </div>
      )}
      {!phongkham && <div>Phòng khám này không có!!</div>}
    </div>
  );
}
