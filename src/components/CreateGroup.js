import React, { useState } from "react";
import GpMemberSearch from "./GpMemberSearch";
// import GpMemberSearch from "./GpMemberSearch";

const CreateGroup = (props) => {
  const [groupName, setGroupName] = useState("");
  return (
    <div className="flex fixed top-0 left-0 h-full w-full min-h-screen min-w-screen justify-center items-center bg-black/50 overflow-scroll no-scrollbar p-4 z-40">
      <div className="relative flex flex-col items-center justify-center w-[50%] min-w-[350px] max-w-[500px] p-3 bg-white overflow-y-scroll no-scrollbar rounded-md">
        <button
          className="block absolute right-0 top-0 bg-red-700 rounded-md text-white font-semibold px-3 py-1"
          onClick={() => {
            props.close();
          }}
        >
          X
        </button>
        <div className="text-center text-3xl">Create Group</div>
        <div className="w-full flex items-center justify-center">
          <input
            placeholder="Group Nmae"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            className="bg-slate-200 items-center w-full pl-2 py-1 mx-2 my-2  rounded-md"
          />
        </div>
        <div className="w-full">
          <GpMemberSearch />
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
