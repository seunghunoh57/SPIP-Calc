// Author: Seunghun Oh
// Returns a functional modal component that explains the usage and applications of the app

import React from "react";
import "./App.css";
import { AppButton } from "./AppButton";

export const AppModal = ({ loadModal, handleModalClose, children }) => {
  const showHideModal = loadModal ? "modal displayBlock" : "modal displayNone";

  return (
    <div className={showHideModal}>
      <section className="modalContent">
        {children}
        <AppButton buttonID={"closeModalButton"} onClick={handleModalClose}>
          Close
        </AppButton>
      </section>
    </div>
  );
};
