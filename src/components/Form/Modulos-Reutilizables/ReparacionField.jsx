import React from 'react';
import { Form, Input } from 'antd';

const ReparacionField = () => (
    <Form.Item
        className="form-item"
        label="Reparación"
        name="reparacion"
        rules={[{ required: true, message: 'La reparación es obligatoria' }]}
    >
        <Input placeholder="Ingrese la reparación del daño" />
    </Form.Item>
);

export default ReparacionField;