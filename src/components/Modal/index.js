import React from 'react';
import PropTypes from 'prop-types'
import Widget from '../Widget';
import styles from './modal.module.css';
import classnames from 'classnames';

export const Modal = ({ children, isOpen, onClose }) => {

  function handleOverlayClick(event) {
    console.log(event.target);
    const isModal = event.target.classList.contains(styles.modal)
    if(isModal && onClose) {
      onClose()
    }
  }

  return (
    <div
      onClick={handleOverlayClick}
      className={classnames(styles.modal, {
        [styles.modalActive]: isOpen
      })}>
      <Widget>{ isOpen && children() }</Widget>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}