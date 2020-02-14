// Author: Seunghun Oh
// Returns a functional modal component that explains the usage and applications of the app

import React from "react";
import "./App.css";

export const AppModal = ({ loadModal, handleModalClose, children }) => {
  const showHideModal = loadModal ? "modal displayBlock" : "modal displayNone";

  return (
    <div className={showHideModal}>
      <section className="modalContent">
        {children}
        <button id="closeModalButton" onClick={handleModalClose}>
          Close
        </button>
      </section>
    </div>
  );
};
