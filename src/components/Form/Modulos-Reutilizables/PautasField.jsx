import React from 'react';
import { Form, Input } from 'antd';

const PautasField = () => (
    <Form.Item
        className="form-item"
        label="Pautas de SPP"
        name="pautas"
        rules={[{ required: true, message: 'Las Pautas son obligatorias' }]}
    >
        <Input placeholder="Ingrese las pautas, con la numeración correspondiente" />
    </Form.Item>
);

export default PautasField;