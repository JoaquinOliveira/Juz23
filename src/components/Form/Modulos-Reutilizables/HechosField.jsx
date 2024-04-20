import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

 const HechosField = ({ rows }) => (
    <Form.Item
        className="form-item"
        label="Hechos"
        name="hechos"
        rules={[{ required: true, message: 'Los hechos son obligatorios' }]}
    >
        <TextArea placeholder="Ingrese los hechos" rows={rows} />
    </Form.Item>
);

export default HechosField