import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import URL from "../env";
import UserChatCard from "./UserChatCard";
import Loading from "./Loading";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    console.log(user?.token);
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`${URL}/api/chat`, config);
      console.log(data);
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    setLoggedUser(user);
    fetchChats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex absolute top-0 left-0 justify-center items-center bg-black/50 h-screen w-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" w-full h-full flex flex-col no-scrollbar overflow-scroll">
      {chats?.length > 0 ? (
        chats.map((data) => {
          if (data.isGroupChat) {
            const detail = {
              _id: data.groupAdmin._id,
              name: data.chatName,
              pic: data.groupAdmin.pic,
              email: data.groupAdmin.email,
            };
            return (
              <div key={data._id} className="p-2">
                <UserChatCard user={detail} />
              </div>
            );
          } else {
            if (data.Users[0]._id === user?._id) {
              return (
                <div key={data._id} className="p-2">
                  <UserChatCard user={data.Users[1]} />
                </div>
              );
            } else if (data.Users[1]._id === user?._id) {
              return (
                <div key={data._id} className="p-2">
                  <UserChatCard user={data.Users[0]} />
                </div>
              );
            } else {
              return <></>;
            }
          }
        })
      ) : (
        <div className="flex justify-center text-slate-400">No User Found</div>
      )}
    </div>
  );
};

export default MyChats;
