import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import URL from "../env";
import axios from "axios";
import Loading from "./Loading";

const UserChatCard = (props) => {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { _id, name, email, pic } = props.user;
  const [loadingChat, setLoadingChat] = useState();

  const accessChat = async () => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post(
        `${URL}/api/chat`,
        { userId: _id },
        config
      );
      console.log(data);
      let found = false;
      chats.forEach((chat) => {
        if (chat._id === data._id) found = true;
      });
      if (!found) setChats((prev) => [data, ...prev]);
      setSelectedChat(data);
      setLoadingChat(false);
      if (props?.closeSearch) {
        props?.closeSearch();
      }
    } catch (err) {
      console.log(err?.message);
      setLoadingChat(false);
    }
  };

  if (loadingChat) {
    return (
      <div className="flex absolute top-0 left-0 justify-center items-center bg-black/50 h-screen w-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="flex flex-row items-center w-full bg-purple-300 hover:bg-purple-500 rounded-md box-border"
      onClick={() => {
        accessChat();
      }}
    >
      <div className="w-fit h-fit p-1">
        <img
          className=" mx-auto rounded-full bg-slate-500 w-[50px] h-[50px]"
          width={50}
          height={50}
          src={pic}
          alt="original"
        />
      </div>
      <div className="flex flex-col justify-evenly p-2">
        <div className="text-lg font-semibold text-balck/2">{name}</div>
        <div className="text-md">{email}</div>
      </div>
    </div>
  );
};

export default UserChatCard;
