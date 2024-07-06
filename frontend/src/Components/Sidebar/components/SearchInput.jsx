import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useChat } from "../../../zustand/useChat";
import { useGetUsers } from "../../../dataAccess/useGetUsers";
import { toast } from "react-toastify";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const { setSelectedConversation } = useChat();
  const { conversations } = useGetUsers();

  const handleSearch = () => {
    if (!searchValue) return;
    if (searchValue.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchValue("");
    } else toast.error("No such user found!");
  };

  return (
    <label className="input input-bordered input-accent flex items-center gap-2 bg-white ">
      <input
        type="text"
        placeholder="Search"
        className=" w-full max-w-xs bg-white"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="btn btn-accent absolute inset-y-4 end-4"
        onClick={handleSearch}
      >
        <FaSearch color="white" />
      </button>
    </label>
  );
};

export default SearchInput;
