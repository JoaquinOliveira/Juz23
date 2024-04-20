import React from 'react';
import { Form, Input } from 'antd';

const ArticuloField = () => (
    <Form.Item
        className="form-item"
        label="Contravención Imputada"
        name="articulo"
        rules={[{ required: true, message: 'El artículo contravencional es obligatorio' }]}
    >
        <Input placeholder="Ingrese el número del artículo contravencional que se le imputa" />
    </Form.Item>
);

export default ArticuloField; 