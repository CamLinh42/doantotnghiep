import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useToken from "../../Hooks/useToken";
import { db } from "../../Firebase/Firebase.config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const [createUserEmail, setCreateUserEmail] = useState("");
  // const [token] = useToken(createUserEmail);
  const navigate = useNavigate();
  // if (token) {
  //   navigate("/");
  // }

  const handleSignUp = (data) => {
    console.log(data);
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("Sign Up seccessfully");
        // update profile
        const userInfo = {
          displayName: data.name,
          admin: false
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.password);
          })
          .catch((error) => console.log());
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message);
      });
  };

  const saveUser = async (name, email, password) => {
    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      password: password,
      role: 1,
    }).then((res) => {console.log(res, "res"); navigate("/")} ).catch(e => {console.log(e, "error")})
  };

  return (
    <div className="flex justify-center ">
      <div className="w-96">
        <h1 className="text-center text-2xl font-bold">Đăng ký</h1>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full m-3">
            <label className="label">
              <span className="label-text">Họ và tên:</span>
            </label>
            <input
              type="name"
              {...register("name", { required: "Name is required" })}
              className="input input-primary input-bordered w-full"
            />
            {errors.name && (
              <p role="alert" className="text-red-600">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full m-3">
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

          <div className="form-control w-full m-3">
            <label className="label">
              <span className="label-text">Mật khẩu</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 charecters long",
                },
              })}
              className="input input-primary input-bordered w-full"
            />
            {errors.password && (
              <p role="alert" className="text-red-600">
                {errors.password?.message}
              </p>
            )}
          </div>
          {signUpError && <p className="text-red-700">{signUpError}</p>}
          <input type="submit" value={"Đăng ký"} className="btn btn-accent w-full m-3" />
          <p className="p-3 flex gap-1">
            Nếu bạn đã có tài khoản:
            <Link to="/login" className="text-primary">
              Đăng nhập
            </Link>
          </p>
        </form>
        {/* <div className="divider">OR</div>
                <button className="btn btn-outline w-full btn-accent m-3">Sign In with Google</button> */}
      </div>
    </div>
  );
};

export default SignUp;
