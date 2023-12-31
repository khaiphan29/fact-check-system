import React from "react";

const page = () => {
  return (
    <div className="-mx-10">
      <h2 className="text-3xl ml-10">Xuất Dữ Liệu</h2>
      <form action="" className="flex">
          <select name="group" id="">
            <option value="0">01</option>
            <option value="0">02</option>
          </select>
          <select name="rating" id="">
            <option value="0">01</option>
            <option value="0">02</option>
          </select>
          <select name="start_date" id="">
            <option value="0">01</option>
            <option value="0">02</option>
          </select>
          <select name="end_date" id="">
            <option value="0">01</option>
            <option value="0">02</option>
          </select>
      </form>
    </div>
  );
};

export default page;
