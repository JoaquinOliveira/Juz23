import React from 'react';
import { Form, Input } from 'antd';



const LicenciadoField = () => (
    <Form.Item
        className="form-item"
        label="Licenciado"
        name="licenciado"
        rules={[{ required: true, message: 'El Licenciado del INCUCAI es obligatorio y sus datos' }]}
    >
        <Input placeholder="Ingrese el nombre y apellido completo del licenciado y su teléfono de contacto" />
    </Form.Item>
);

export default LicenciadoField