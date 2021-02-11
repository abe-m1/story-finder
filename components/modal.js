import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';

const Modal = ({ open, staticBackground, children }) => {
  const [showModal, setShowModal] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!staticBackground) {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          // onClose();
          setShowModal(null);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [wrapperRef]);

  useEffect(() => {
    if (open && !showModal) {
      setShowModal(true);
    } else if (!open && showModal) {
      setShowModal(null);
    }
  }, [open]);

  function closeModal() {
    // onClose();
    setShowModal(null);
  }

  return showModal
    ? ReactDom.createPortal(
        <div className="modal-background">
          <div ref={wrapperRef} className="modal">
            {/* {React.Children.map(children, (child, i) => {
              if (child.type === ModalHeader) {
                return React.cloneElement(child, {
                  ...child.props,
                  closeModal,
                });
              }
              return child;
            })} */}
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
