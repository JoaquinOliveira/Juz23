import React from 'react';
import { Form, Input } from 'antd';

const DomicilioField = () => (
    <Form.Item
        className="form-item"
        label="Domicilio"
        name="domicilio"
        rules={[{ required: true, message: 'El domicilio es obligatorio' }]}
    >
        <Input placeholder="Ingrese el domicilio de la persona a citar" />
    </Form.Item>
);
export default DomicilioField