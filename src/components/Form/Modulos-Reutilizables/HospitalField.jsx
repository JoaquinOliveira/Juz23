import React from 'react';
import { Form, Input } from 'antd';



const Hospital = () => (
    <Form.Item
        className="form-item"
        label="Hospital"
        name="hospital"
        rules={[{ required: true, message: 'El Hospital es obligatorio' }]}
    >
        <Input placeholder="Ingrese el Hospital y dónde está el fallecido. Ej: 'Hospital Ramos Mejia, Sala 5 de urgencias'" />
    </Form.Item>
);

export default Hospital