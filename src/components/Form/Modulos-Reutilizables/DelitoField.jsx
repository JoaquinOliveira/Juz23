import React from 'react';
import { Form, Input } from 'antd';

const DelitoField = () => (
    <Form.Item
        className="form-item"
        label="Delito que se le imputa"
        name="delito"
        rules={[{ required: true, message: 'El delito imputado es obligatorio' }]}
    >
        <Input placeholder="Ingrese el nombre del delito que se imputa. Ej: amenazas" />
    </Form.Item>
);
export default DelitoField

