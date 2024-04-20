import React from 'react';
import { Form, Input } from 'antd';

const JuzgadoField = () => {
    return (
        <Form.Item
            className="form-item"
            label="Juzgado"
            name="juzgado"
            rules={[
                { required: true, message: 'El Juzgado es obligatorio' },
                {
                    pattern: /^(0?[1-9]|[12][0-9]|3[01])$/,
                    message: 'Ingrese el número del Juzgado del 1 al 31',
                },
            ]}
        >
            <Input placeholder="Ingrese el número del Juzgado" />
        </Form.Item>
    );
};

export default JuzgadoField;