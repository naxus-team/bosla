import React from "react";

interface ErrorMessageProps {
  operation: string;
  response?: string; // مجرد نص
  isError?: boolean; // تحدد اللون
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ operation, response, isError = false, onClose }) => {
  if (!operation) return null;

  const timestamp = new Date().toLocaleString();

  return (
    <div dir="ltr" className="fixed left-0 top-0 bg-black/70 text-white h-screen w-[256px] p-4 shadow-lg z-50 flex flex-col">
      <span className="text-background text-base font-bold">Logs</span>
      <div className="w-full h-[1px] bg-background/10 my-3"></div>

      {/* العملية */}
      <span className="flex items-center text-sm">[{timestamp}]</span>
      &nbsp;
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col relative mb-2">
          <div className={`bg-black p-4 rounded-lg`}>
            <span className="text-sm font-semibold text-white text-pretty">{operation}</span>
          </div>

        </div>

        {/* الرد */}
        {response && (
          <div className={`relative`}>
            <div className={`bg-background p-4 rounded-lg`}>
              <span className={`text-sm font-semibold text-background_dark text-pretty`}>{response}</span>
            </div>
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-auto bg-white text-md text-black font-bold px-2 py-1 rounded hover:bg-gray-100"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
