import React from "react";
import Search from "./Serach";
import TodoLists from "./TodoList";
import SearchFilter from "./SerachFilter";

const Aside = () => {
  return (
    <div className="w-[99%] md:w-3/4 h-[99%] relative z-20 bg-blue-500 rounded-2xl ml-auto mr-[3px]">
      <Search />
      <SearchFilter />
      <div className="w-3/4 mx-auto h-[3px] bg-purple-500"></div>
      <TodoLists />
    </div>
  );
};

export default Aside;
