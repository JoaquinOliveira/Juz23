import React from 'react';
import { Form, Input } from 'antd';

const DamnificadoField = () => (
    <Form.Item
        label="Parte damnificada"
        name="denunciante"
    >
        <Input placeholder="Ingrese el nombre de la parte damnificada, si corresponde" />
    </Form.Item>
);

export default DamnificadoField;