import { FaRegComments } from "react-icons/fa";

const Comments = () => {
  return (
    <div className="h-full">
      <div className="w-full py-3 border-b mb-4">
        <h1 className="text-xl font-semibold flex items-center gap-x-1">
          <FaRegComments />
          Yorumlar
        </h1>
      </div>
    </div>
  );
};

export default Comments;
