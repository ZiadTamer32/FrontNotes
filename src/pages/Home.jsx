import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNotes } from "../context/NotesContext";
import Modal from "../components/Modal";
import NoteCard from "../components/NoteCard";
import AddNote from "../components/AddNote";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

function Home() {
  const { allNotes, deleteNote, isGetting } = useNotes();

  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    data: null,
    type: null
  });

  const handleCloseModal = () => {
    setIsModalOpen({ isOpen: false, data: null, type: null });
  };

  if (isGetting) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
        {allNotes?.length > 0 ? (
          allNotes?.map((note, index) => (
            <NoteCard
              key={index}
              title={note.title}
              date={note.date}
              content={note.description}
              isPinned={note.isPinned}
              tags={note.tags}
              onEdit={() => {
                setIsModalOpen({
                  isOpen: true,
                  data: note,
                  type: "edit"
                });
              }}
              onDelete={() => {
                deleteNote(note._id);
              }}
              onPin={() => {}}
            />
          ))
        ) : (
          <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center col-span-full">
            <h1 className="text-2xl text-gray-600 font-bold">No notes found</h1>
          </div>
        )}
      </div>

      <button
        onClick={() =>
          setIsModalOpen({ isOpen: true, data: null, type: "create" })
        }
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-500 text-white rounded-lg cursor-pointer text-center flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        <FaPlus size={20} />
      </button>

      <Modal isOpen={isModalOpen.isOpen}>
        <AddNote
          onClick={handleCloseModal}
          type={isModalOpen.type}
          data={isModalOpen.data}
        />
      </Modal>
    </>
  );
}

export default Home;
