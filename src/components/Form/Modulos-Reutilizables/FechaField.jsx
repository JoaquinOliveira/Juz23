import React from 'react';
import { Form, Input } from 'antd';

const FechaField = () => (
    <Form.Item
        className="form-item"
        label="Fecha"
        name="fecha"
        rules={[
            { required: true, message: 'La fecha es obligatoria' },
            {
                pattern: /^\d{1,2} de [a-zA-Z]+ de \d{4}$/,
                message: 'Ingrese una fecha válida en formato "día de mes de año"',
            },
        ]}
    >
        <Input placeholder="Ejemplo: 30 de diciembre de 2024" />
    </Form.Item>
);

export default FechaField