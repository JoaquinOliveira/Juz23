import React from 'react';
import { Form, Input } from 'antd';

const FiscalField = () => (
    <Form.Item
        className="form-item"
        label="Fiscal"
        name="fiscal"
        rules={[{ required: true, message: 'La fiscalía es obligatoria' }]}
    >
        <Input placeholder="Ingrese el Fiscal presente y la Fiscalía. Ej: José Silvie, Fiscalía PCyF Nº 10" />
    </Form.Item>
);

export default FiscalField;