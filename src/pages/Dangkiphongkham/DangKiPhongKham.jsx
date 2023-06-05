import React from "react";

export default function DangKiPhongKham() {
  return (
    <div>
      {/* <div className="box-border">
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
              <div className="modal-action justify-center">
                <label
                  htmlFor="my-modal"
                  className="btn"
                  onClick={() => setListImage([])}
                >
                  Hủy
                </label>
                <button type="submit" className="btn">
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      test
    </div>
  );
}
