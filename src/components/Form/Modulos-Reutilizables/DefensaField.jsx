import React from 'react';
import { Form, Input } from 'antd';

const DefensaField = () => (
    <Form.Item
        className="form-item"
        label="Defensa"
        name="defensa"
        rules={[{ required: true, message: 'La defensa es obligatoria' }]}
    >
        <Input placeholder="Ingrese el defensor presente y la defensoría. Ej: Andrea Piesco, Defensoría PCyF Nº " />
    </Form.Item>
);

export default DefensaField;