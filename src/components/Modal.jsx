function Modal({ children, isOpen }) {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-lg z-50 overflow-y-scroll max-h-3/4 p-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
