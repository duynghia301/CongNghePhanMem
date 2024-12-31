"use client"; // Client Component for interactivity

import { useState } from "react";

const CopyPhoneNumber = ({ phoneNumber }: { phoneNumber: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhoneNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset trạng thái sau 2 giây
  };

  return (
    <div className="mt-6">
      SDT liên hệ:<span className="text-lg font-semibold"> {phoneNumber}</span>
      <div>
      <button
        onClick={handleCopyPhoneNumber}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {copied ? "Đã sao chép!" : "Sao chép số điện thoại"}
      </button>
      </div>
    </div>
  );
};

export default CopyPhoneNumber;
