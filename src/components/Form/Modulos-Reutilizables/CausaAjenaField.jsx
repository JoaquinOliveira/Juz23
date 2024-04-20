import React from 'react';
import { Form, Input } from 'antd';

const CausaAjenaField = () => {
    return (
        <Form.Item
            className="form-item"
            label="Causa Ajena"
            name="causaajena"
            rules={[{ required: true, message: 'La causa del Juzgado de la conexidad es obligatoria' }]}
        >
            <Input placeholder="Agregue el número de causa del Juzgado al cual se conexa" />
        </Form.Item>
    );
};

export default CausaAjenaField;