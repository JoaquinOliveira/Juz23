import React from 'react';
import { Modal } from 'antd';

const DocumentPreview = ({ fileContent, isOpen, onClose }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            onOk={onClose}
            width={800} // Establece el ancho del modal a 800px
            styles={{ maxWidth: '100%', overflow: 'auto' }} // Ajusta el ancho máximo del contenido y agrega barras de desplazamiento si es necesario
        >
                <div dangerouslySetInnerHTML={{ __html: fileContent }} />
        </Modal>
    );
};
export default DocumentPreview;