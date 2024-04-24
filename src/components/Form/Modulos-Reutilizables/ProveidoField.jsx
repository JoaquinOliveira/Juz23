import React from 'react';
import { Form, Input } from 'antd';

const ProveidoField = () => (
    <Form.Item
        className="form-item"
        label="Proveido a Notificar"
        name="proveido"
        rules={[{ required: true, message: 'El proveido a notificar es obligatorio' }]}
    >
        <Input placeholder="Ingrese el proveido a notificar" />
    </Form.Item>
);
export default ProveidoField