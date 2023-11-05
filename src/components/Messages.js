import React from "react";

const Messages = (props) => {
  // console.log(props.message, props.loggedUser);
  const sender =
    props.message.sender._id === props.loggedUser._id ? true : false;

  return (
    <div>
      {sender ? (
        <div class="col-start-6 col-end-13 p-3 rounded-lg">
          <div class="flex items-center justify-start flex-row-reverse">
            <div className="w-fit h-fit p-1">
              <img
                className=" mx-auto rounded-full bg-slate-300 w-[40px] h-[40px]"
                width={50}
                height={50}
                src={props.message.sender?.pic}
                alt="original"
              />
            </div>

            <div class="relative mr-3 text-sm bg-green-200 py-2 px-4 shadow-lg rounded-xl max-w-[calc(100%-60px)]">
              <div>{props.message.content}</div>
            </div>
          </div>
        </div>
      ) : (
        <div class="col-start-1 col-end-8 p-3 rounded-lg">
          <div class="flex flex-row items-center">
            <div className="w-fit h-fit">
              <img
                className=" mx-auto rounded-full bg-slate-300 w-[40px] h-[40px]"
                width={40}
                height={40}
                src={props.message.sender?.pic}
                alt="original"
              />
            </div>
            <div class="relative ml-3 text-sm bg-yellow-100 py-2 px-4 shadow-lg rounded-xl max-w-[calc(100%-60px)]">
              <div>{props.message.content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
