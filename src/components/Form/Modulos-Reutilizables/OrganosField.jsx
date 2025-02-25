import React from 'react';
import { Form, Input } from 'antd';



const OrganosField = () => (
    <Form.Item
        className="form-item"
        label="Organos"
        name="organos"
        rules={[{ required: true, message: 'Los organos son obligatorios' }]}
    >
        <Input placeholder="Ingrese los órganos a donar" />
    </Form.Item>
);

export default OrganosField