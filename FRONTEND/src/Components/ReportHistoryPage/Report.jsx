import React from "react";

function Report({ url, email, createdAt }) {
  const onClickDownloadBtn = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${email}-${new Date().toLocaleDateString()}`;
    a.click();
  };

  return (
    <div className=" flex items-center justify-between px-10  bg-cyan-200 p-4">
      <p>{new Date(createdAt).toLocaleString()}</p>

      <button
        onClick={onClickDownloadBtn}
        className=" bg-zinc-950 text-white p-1 rounded-md text-sm"
      >
        DOWNLOAD
      </button>
    </div>
  );
}

export default Report;
