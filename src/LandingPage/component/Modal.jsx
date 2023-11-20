import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

    return (
        <div className={modalClasses}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded-md z-10">
                <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
