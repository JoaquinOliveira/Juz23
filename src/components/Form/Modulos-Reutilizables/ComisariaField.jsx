import React from 'react';
import { Form, Input } from 'antd';

const ComisariaField = () => (
    <Form.Item
        className="form-item"
        label="Comisaria"
        name="comisaria"
        rules={[{ required: true, message: 'La comisaria es obligatoria' }]}
    >
        <Input placeholder="Inserte la comisaria y de qué localidad pertenece (ej. PCABA o de la Provincia con localidad" />
    </Form.Item>
);
export default ComisariaField