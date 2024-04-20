import React from 'react';
import { Form, Input } from 'antd';

 const ImputadoField = () => (
    <Form.Item
        className="form-item"
        label="Parte imputada"
        name="imputado"
        rules={[{ required: true, message: 'La parte imputada es obligatoria' }]}
    >
        <Input placeholder="Ingrese el nombre completo del imputado" />
    </Form.Item>
);

export default ImputadoField