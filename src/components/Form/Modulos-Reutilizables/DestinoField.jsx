import React from 'react';
import { Form, Input } from 'antd';

const DestinoField = () => (
    <Form.Item
        label="Destino"
        name="destino"
    >
        <Input placeholder="Poner nombre de la cámara donde va" />
    </Form.Item>
);

export default DestinoField