import { FaEye } from "react-icons/fa6";
import { IoIosEyeOff } from "react-icons/io";

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  showPassword = false,
  setShowPassword = () => {},
  isPassWordField = false
}) {
  return (
    <>
      <label className="text-gray-600">{label}</label>
      <div className="flex relative items-center">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
        />
        {isPassWordField && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 cursor-pointer"
          >
            {showPassword ? (
              <FaEye className="text-gray-500" />
            ) : (
              <IoIosEyeOff className="text-gray-500" />
            )}
          </span>
        )}
      </div>
    </>
  );
}

export default InputField;
