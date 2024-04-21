import React from 'react';
import { Form, Input } from 'antd';

const DiaField = () => (
    <Form.Item
        className="form-item"
        label="Día de Resolución"
        name="dia"
        rules={[{ required: true, message: 'El día de la resolución es obligatorio' }]}
    >
        <Input placeholder="Ingrese el día en el qué se dictó la resolución" />
    </Form.Item>
);

export default DiaField;