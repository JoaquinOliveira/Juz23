import React from 'react';
import { Form, Input } from 'antd';

const HoraField = () => (
    <Form.Item
        className="form-item"
        label="Hora"
        name="hora"
        rules={[
            { required: true, message: 'La hora es obligatoria' },
            {
                pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]\shoras$/,
                message: 'Ingrese una hora válida en formato "XX:XX horas"',
            },
        ]}
    >
        <Input placeholder="Ejemplo: 10:15 horas" />
    </Form.Item>
);

export default HoraField;