import React from 'react';
import { Form, Input } from 'antd';

 const CaratulaField = () => (
    <Form.Item
        className="form-item"
        label="Carátula"
        name="caratula"
        rules={[{ required: true, message: 'La carátula es obligatoria' }]}
    >
        <Input placeholder="Carátula" />
    </Form.Item>
);
export default CaratulaField