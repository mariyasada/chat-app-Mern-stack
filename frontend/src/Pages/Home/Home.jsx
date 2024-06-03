import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MessageContainer from "../../Components/MessageContainer/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[630px] sm:w-[550px] md:w-[1280px] rounded-lg bg-fuchsia-50  overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0.2">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
