import { Dispatch, ReactNode, SetStateAction } from "react";

export default function Modal({
  children,
  setModalStats,
}: {
  children: ReactNode;
  setModalStats: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full vh-100 z-10 ">
        <div className="relative w-[85%]">
          <img
            className="shadow-toggle-shadow button-hover-click absolute top-3 right-4 w-7"
            src="/icons/close-square-red.svg"
            alt=""
            onClick={() => setModalStats((prevState) => !prevState)}
          />
          <div className="content p-4 bg-[#fff9e4] rounded w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
