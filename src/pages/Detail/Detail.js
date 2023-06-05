import { useContext, useEffect } from "react";
import { HospitalContext } from "../../Context/HospitalProvider";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../Context/DoctorProvider";
import { useNavigate } from "react-router-dom";

export default function Detail() {
  const { getHospitalByName, hospitalByName } = useContext(HospitalContext);
  const { doctor, getDoctorByHospital } = useContext(DoctorContext);
  const { phongkham } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getHospitalByName(phongkham);
    getDoctorByHospital(phongkham);
  }, []);
  console.log("doctor", doctor);
  return (
    <div>
      {phongkham && (
        <div className="hero min-h-screen bg-base-200">
          <div className=" hero-content flex-row lg:flex-row-reverse">
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
            {hospitalByName.map((hospital, _) => {
              return (
                <div>
                  <h1 className="text-5xl font-bold">
                    Bệnh viện: {hospital.name}
                  </h1>
                  <h1 className="text-5xl font-bold">
                    Chi tiết:{hospital.chitiet}
                  </h1>
                  <h1 className="text-5xl font-bold">
                    Chuyên Chữa:{hospital.chuyenchua}
                  </h1>
                  <h1 className="text-5xl font-bold">
                    Địa chỉ:{hospital.address}
                  </h1>
                  <h1 className="text-5xl font-bold">
                    Số điện thoại:{hospital.phone}
                  </h1>
                </div>
              );
            })}
          </div>
          <div className="relative top-[10rem]">Danh sách bác sĩ</div>
          {doctor.length > 0 ? (
            <div className="overflow-x-auto relative top-56">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>stt</th>
                    <th>Name</th>
                    <th>detail</th>
                  </tr>
                </thead>
                <tbody>
                  {doctor.length ? (
                    doctor.map((doctor, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div>
                                <div className="font-bold">{doctor.name}</div>
                              </div>
                            </div>
                          </td>
                          <th>
                            <button
                              className="btn btn-ghost btn-xs"
                              onClick={() => {
                                navigate(`/detail/doctor/${doctor.name}`);
                              }}
                            >
                              details
                            </button>
                          </th>
                        </tr>
                      );
                    })
                  ) : (
                    <div>Không có bác sĩ nào!!!</div>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="relative top-56">
              bệnh viện chưa tuyển bác sĩ nào!!!
            </div>
          )}
        </div>
      )}
      {!phongkham && <div>Phòng khám này không có!!</div>}
    </div>
  );
}
