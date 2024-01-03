import React, { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(0);

  const MyModal = () => {
    return (
      <>
        <h2>Stay Tunded</h2>;
        <p>
          Subscribe to our newsletter and never miss our designs,latest
          news.etc. Our newsletter is sent once a week, every Monday
        </p>
        <button
          onClick={() => {
            setShowModal(0);
          }}
        >Accept it</button>
        ;
      </>
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(1);
          console.log(showModal);
        }}
      >
        Open Modal
      </button>
      {showModal && <MyModal />}
    </div>
  );
};

export default Modal;
