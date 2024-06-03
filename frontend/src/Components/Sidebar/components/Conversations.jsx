import React from "react";
import SingleUser from "./SingleUser";
import { useChat } from "../../../zustand/useChat";
import { useGetUsers } from "../../../dataAccess/useGetUsers";
import { UserLoader } from "../../../Loaders/UserLoader";

const Conversations = () => {
  const { loading, conversations } = useGetUsers();
  return (
    <div className="p-4 flex flex-col overflow-auto hide-scrollbar">
      {conversations?.map((user, index) => (
        <SingleUser
          key={user?._id}
          user={user}
          lastIndex={index === conversations?.length - 1}
        />
      ))}
      {loading ? <UserLoader /> : null}
    </div>
  );
};

export default Conversations;
