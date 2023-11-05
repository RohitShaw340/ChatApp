import React, { useEffect, useState, useRef } from "react";
import { ChatState } from "../context/ChatProvider";
import { Send, View } from "lucide-react";
import Profile from "./Profile";
import axios from "axios";
import URL from "../env";
import Loading from "./Loading";
import Messages from "./Messages";
import io from "socket.io-client";
// import chatbackground from "../../public/chat_background.jpg";

const ENDPOINT = URL;
let socket, selectedChatCompare;

const ChatBox = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [openProfile, setOpenProfile] = useState(false);
  const [reciver, setReciver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!user || !selectedChat) setLoading(true);
    else {
      setLoading(false);
      console.log("user", user);
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connection", () => {
        setSocketConnected(true);
      });
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [selectedChat, user]);

  // console.log(typeof messages);
  const closeProfile = () => {
    setOpenProfile((prev) => !prev);
  };

  const sendMessage = async () => {
    socket.emit("stop typing", selectedChat._id);
    setTyping(false);
    const sent_message = newMessage;
    setNewMessage("");
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          URL + "/api/message",
          {
            content: sent_message,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("new message", { message: data, chat: selectedChat });
        if (data) {
          setMessages((prev) => {
            return [...prev, data];
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchMessage = async () => {
    setLoading(true);
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `${URL}/api/message/${selectedChat._id}`,
        config
      );
      if (data.message) setMessages(data.message);
      else setMessages([]);
      setLoading(false);
      socket.emit("join chat", selectedChat?._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      fetchMessage();
      // var objDiv = document.getElementById("message");
      // objDiv.scrollTop = objDiv.scrollHeight;

      selectedChatCompare = selectedChat;
      selectedChat.Users.map((data) => {
        if (data._id !== user._id) {
          setReciver(data);
        }
      });
    }
  }, [selectedChat, user]);

  useEffect(() => {
    if (!user || !selectedChat) setLoading(true);
    else {
      setLoading(false);
      socket.on("message recived", (newMessageRecived) => {
        console.log("socket reciver", newMessageRecived, selectedChatCompare);
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageRecived.chat._id
        ) {
        } else {
          setMessages((prev) => {
            return [...prev, newMessageRecived.message];
          });
          // setMessages([...messages, ]);
        }
      });
    }
  }, [user, selectedChat]);

  useEffect(scrollToBottom, [messages]);

  // console.log(selectedChat);

  const handleMessage = (e) => {
    e.target.style.height = "28px";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { selectedChat, user });
    }
    let lastTypingTime = new Date().getTime();
    // let lastMessage = newMessage;
    const timeLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      const time_diff = timeNow - lastTypingTime;
      if (time_diff > timeLength && typing) {
        socket.emit("stop typing", { selectedChat, user });
        setTyping(false);
      }
    }, timeLength);
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  // max-w-[calc(100vw-17px)]

  if (!reciver) {
    return (
      <div className="w-full h-full flex justify-center items-center text-5xl">
        Select a chat to start
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black/50 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center box-border w-full  h-full px-2 py-2">
      <div className="flex flex-row justify-between h-[45px] w-full mb-2">
        <div className="flex flex-row">
          <button
            className="h-fit text-center bg-purple-600 text-stone-50 hover:bg-purple-300 hover:text-stone-500 p-2 rounded-md mr-2 flex md:hidden"
            onClick={() => {
              setSelectedChat(null);
            }}
          >
            Back
          </button>
          <div className=" -fit flex flex-col justify-start">
            <div className="text-2xl capitalize">{reciver.name}</div>

            <div className="h-[13px] text-[12px] ">
              {isTyping && "Typing..."}
            </div>
          </div>
        </div>
        <div className="p-1 h-[35px] flex justify-center items-center bg-slate-200">
          <button onClick={closeProfile}>
            <View size={20} color="#34c0eb" />
          </button>
          {openProfile && <Profile user={reciver} close={closeProfile} />}
        </div>
      </div>
      <div className="flex flex-col items-center h-[calc(100%-45px)] bg-chatbox bg-center bg-no-repeat bg-cover w-full rounded-md ">
        {/* <img
          src="/chat_background.jpg"
          height={100}
          width={100}
          alt="not found"
        /> */}
        <div
          id="message"
          // on={(e) => {
          //   e.target.scrollTop = e.target.scrollHeight;
          // }}
          className="h-full w-full overflow-scroll no-scrollbar shadow-inner rounded-md p-2 "
        >
          {console.log(messages)}
          {messages.map((data) => {
            return <Messages message={data} loggedUser={user} />;
          })}
          {/* {isTyping && <div className="">Typing...</div>} */}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="flex flex-row items-end py-1 px-2 h-fit w-[calc(100%-8px)] m-2 justify-between shadow-md bg-white rounded-md ">
          <div className="w-full flex items-center justify-center">
            <textarea
              value={newMessage}
              placeholder="Enter Text..."
              className="no-scrollbar no-resizer w-full outline-none h-[28px] min-h-[15px] max-h-[150px]"
              onChange={handleMessage}
              onLoad={handleMessage}
              onKeyDown={handleMessage}
            ></textarea>
          </div>
          {/* <div className="w-[calc(100%-10px)] h-fit max-h-[150px] overflow-y-auto no-scrollbar">
            <div
              className="w-full outline-none max-h-[150px] "
              contenteditable="true"
              aria-multiline="true"
              aria-label="Message"
            ></div>
          </div> */}
          <div>
            <button onClick={sendMessage}>
              <Send size={25} fill="#D8B4FE" color="rgb(168, 85, 247)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
