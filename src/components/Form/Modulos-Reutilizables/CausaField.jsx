import React from 'react';
import { Form, Input } from 'antd';

const CausaField = () => (
    <Form.Item
        className="form-item"
        label="Causa"
        name="causa"
        rules={[{ required: true, message: 'La causa es obligatoria' }]}
    >
        <Input placeholder="Número de causa" />
    </Form.Item>
);
export default CausaField