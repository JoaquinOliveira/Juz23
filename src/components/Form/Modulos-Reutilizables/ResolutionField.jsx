import React from 'react';
import { Form, Input } from 'antd';

const ResolutionField = () => (
    <Form.Item
        className="form-item"
        label="Resolución"
        name="resolucion"
        rules={[{ required: true, message: 'La resolución es obligatoria' }]}
    >
        <Input placeholder="Ingrese la parte resolutiva" />
    </Form.Item>
);

export default ResolutionField;