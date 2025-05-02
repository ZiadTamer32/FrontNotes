import { getInitial } from "../utils/getInitial";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Searchbar from "./Searchbar";

function Navbar() {
  const { loggedUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="py-2 px-4 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center flex-wrap justify-between gap-4">
        {/* Title */}
        <h1 className="text-2xl font-bold">Notes</h1>
        <div className="flex-1 py-2">
          <Searchbar />
        </div>
        {/* Profile */}
        <div className="gap-3 flex">
          <div className="w-12 h-12 text-gray-600 bg-gray-200 rounded-full flex items-center justify-center">
            {getInitial(loggedUser?.name)}
          </div>
          <div>
            <p className="text-gray-600">{loggedUser?.name}</p>
            <button
              onClick={handleLogout}
              className="text-gray-400 text-sm hover:underline hover:text-blue-500 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
