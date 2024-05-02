import React from 'react';
import { Modal} from 'antd';



const CustomModals = (props) => {
    const {title, hideModal, open, performAction} = props;

  return (
    <>
    <Modal
        title="Confirmation"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
    >
        <p>{title}</p>
    </Modal>
</>
  )
}

export default CustomModals