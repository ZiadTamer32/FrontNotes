import { MdOutlinePushPin } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function NoteCard({
  title,
  date,
  content,
  isPinned,
  tags,
  onEdit,
  onDelete,
  onPin
}) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">{title}</h4>
        <MdOutlinePushPin
          onClick={onPin}
          className={`${
            isPinned ? "text-blue-500" : "text-gray-400"
          } cursor-pointer hover:text-blue-500`}
        />
      </div>
      <div className="text-sm text-gray-400 mt-2">{date}</div>
      <p className="text-gray-600 mt-2">
        {content?.length > 60 ? `${content?.slice(0, 60)}...` : content}
      </p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-gray-400">{tags?.map((tag) => `#${tag} `)}</div>
        <div className="flex items-center gap-2">
          <IoMdCreate
            onClick={onEdit}
            className="text-gray-400 cursor-pointer"
          />
          <MdDelete
            onClick={onDelete}
            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
