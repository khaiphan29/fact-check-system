import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-[90vh] justify-center items-center">
      <h2 className="text-3xl mb-32">Xuất dữ liệu của bạn</h2>

      <div className="flex gap-32">
        <div className="py-2 px-10 border border-solid border-black text-3xl hover:bg-black hover:text-white">
          CSV
        </div>
        <div className="py-2 px-10 border border-solid border-black text-3xl hover:bg-black hover:text-white">
          JSON
        </div>
      </div>
    </div>
  );
};

export default page;
