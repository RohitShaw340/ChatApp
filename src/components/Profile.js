import React from "react";

const Profile = (props) => {
  const { name, pic, email } = props.user;
  return (
    <div className="flex absolute top-0 left-0 h-screen w-screen justify-center items-center bg-black/50  z-40">
      <div className=" relative flex flex-col items-center justify-center w-fit min-w-[350px] h-fit p-3 bg-white  rounded-md">
        <button
          className="block absolute right-0 top-0 bg-red-700 rounded-md text-white font-semibold px-3 py-1"
          onClick={() => {
            props.close();
          }}
        >
          X
        </button>
        <div className="text-2xl font-semibold capitalize ">{name}</div>
        <div className=" my-3 w-fit h-fit p-1">
          <img
            className=" mx-auto rounded-full bg-slate-500 w-[150px] h-[150px]"
            width={150}
            height={150}
            src={pic}
            alt="original"
          />
        </div>
        <div className="text-lg font-semibold">{email}</div>
      </div>
    </div>
  );
};

export default Profile;
