import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const notesContext = createContext();

function NotesProvider({ children }) {
  const { loggedUser } = useAuth();
  const [allNotes, setAllNotes] = useState(null);
  const [isGetting, setIsGetting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");
  // GET All Notes
  const getAllNotes = async () => {
    try {
      setIsGetting(true);
      const response = await axios.get(
        `https://notesapi-ebon.vercel.app/notes?keyword=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const sortNotes = response.data.notes.sort((a, b) => {
        return Number(b.isPinned) - Number(a.isPinned);
      });
      setAllNotes(sortNotes);
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0]?.msg || "Something went wrong."
      );
    } finally {
      setIsGetting(false);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      getAllNotes();
    } else {
      setAllNotes(null);
    }
  }, [loggedUser]);

  // Create Note
  const createNote = async (title, description, tags) => {
    try {
      setIsCreating(true);
      const response = await axios.post(
        "https://notesapi-ebon.vercel.app/notes",
        { title, description, tags },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAllNotes([...allNotes, response.data.note]);
      toast.success("Note created successfully");
      return true;
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0]?.msg || "Something went wrong."
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://notesapi-ebon.vercel.app/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllNotes(allNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0]?.msg || "Something went wrong."
      );
    }
  };

  // Update Note
  const updateNote = async (id, title, description, tags) => {
    try {
      setIsCreating(true);
      const response = await axios.put(
        `https://notesapi-ebon.vercel.app/notes/${id}`,
        {
          title,
          description,
          tags
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAllNotes(
        allNotes.map((note) => (note._id === id ? response.data.note : note))
      );
      toast.success("Note updated successfully");
      return true;
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0]?.msg || "Something went wrong."
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  // isPinned Update Note
  const updateIsPinned = async (id, isPinned) => {
    try {
      setIsCreating(true);
      const response = await axios.put(
        `https://notesapi-ebon.vercel.app/notes/${id}/isPinned`,
        {
          isPinned
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAllNotes(
        allNotes.map((note) => (note._id === id ? response.data.note : note))
      );
      if (isPinned) {
        toast.success("Note pinned successfully");
      } else {
        toast.success("Note unpinned successfully");
      }
      return true;
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0]?.msg || "Something went wrong."
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <notesContext.Provider
      value={{
        isGetting,
        isCreating,
        allNotes,
        setAllNotes,
        query,
        setQuery,
        getAllNotes,
        createNote,
        deleteNote,
        updateNote,
        updateIsPinned
      }}
    >
      {children}
    </notesContext.Provider>
  );
}

function useNotes() {
  const context = useContext(notesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

export { NotesProvider, useNotes };
