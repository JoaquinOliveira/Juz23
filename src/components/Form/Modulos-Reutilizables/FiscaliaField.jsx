import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const FiscaliaField = ({ rows }) => {
    return (
        <Form.Item
            className="form-item"
            label="Fiscalía"
            name="fiscal"
            rules={[{ required: true, message: 'Lo que dijo Fiscalía es obligatorio' }]}
        >
            <TextArea placeholder='Ingrese qué dijo la Fiscalía' rows={rows} />
        </Form.Item>
    );
};

export default FiscaliaField;