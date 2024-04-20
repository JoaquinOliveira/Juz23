import React from 'react';
import { Form, Input } from 'antd';

const ComunaField = () => {
    return (
        <Form.Item
            className="form-item"
            label="Comuna"
            name="comuna"
            rules={[{ required: true, message: 'La Comuna es obligatoria' }]}
        >
            <Input placeholder="Ingrese el número de la Comuna" />
        </Form.Item>
    );
};

export default ComunaField;