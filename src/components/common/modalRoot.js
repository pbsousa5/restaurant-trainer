// These are regular React components we will write soon
import DetailsModal from './DetailsModal'
//import ConfirmLogoutModal from './ConfirmLogoutModal'
import { connect } from 'react-redux';
import React, { Component } from 'react'

const MODAL_COMPONENTS = {
  'WINE_MODAL': DetailsModal,
  //'CONFIRM_LOGOUT': ConfirmLogoutModal,
  /* other modals */
}

const ModalRoot = ({ modalType, bottle, toggle }) => {
  if (!modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...bottle} />
}

export default connect(
  state => state.modal
)(ModalRoot)
