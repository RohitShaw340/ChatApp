import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import URL from "../env";
import Loading from "./Loading";
import UserChatCard from "./UserChatCard";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [user, setUser] = useState();

  const { user } = ChatState();

  useEffect(() => {
    if (!user) setLoading(true);
    else {
      setLoading(false);
    }
  }, [user]);

  const close = () => {
    setSearch("");
  };

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      console.log(val);
      const { data } = await axios.get(`${URL}/api/user?search=${val}`, config);

      setSearchResult(data);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <input
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        className="bg-slate-200 items-center pl-2  py-1 mx-2  rounded-md"
      />
      {search && (
        <div className="absolute top-[60px] left-0 mx-auto min-w-[100px] md:min-w-[270px] w-screen md:w-[calc(35%)] h-[88.9vh]  box-border z-20">
          <div className="flex flex-col h-full w-[calc(100%-18px)] md:w-[98%] m-2 bg-white rounded-lg no-scrollbar overflow-scroll">
            {loading ? (
              <div className="flex justify-center items-center w-full h-full ">
                <Loading />
              </div>
            ) : searchResult.length > 0 ? (
              searchResult.map((data) => {
                return (
                  <div key={data._id} className="w-full p-2">
                    <UserChatCard
                      user={data}
                      isGroup={false}
                      closeSearch={close}
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center text-slate-400">
                No User Found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
