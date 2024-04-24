import React from 'react';
import { Form, Input } from 'antd';



const Hospital = () => (
    <Form.Item
        className="form-item"
        label="Dni"
        name="dni"
        rules={[{ required: true, message: 'El DNI es obligatorio' }]}
    >
        <Input placeholder="Ingrese dni" />
    </Form.Item>
);

export default Hospital