import React, { useState, ReactNode } from "react"

import './styles.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }


function Modal(props: ModalProps) {
    const { isOpen, onClose, children } = props;

    const handleClose = () => {
        onClose();
      };

    return(
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleClose}>&times;</span>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
