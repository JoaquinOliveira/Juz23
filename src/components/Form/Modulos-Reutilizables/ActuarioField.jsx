import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const ActuarioField = () => (
    <Form.Item
        className="form-item"
        label="Actuario"
        name="actuario"
        rules={[{ required: true, message: 'El actuario es obligatorio' }]}
    >
        <Select placeholder="Seleccione un actuario">
            <Option value="Javier Lombardo, Secretario">Javier Lombardo</Option>
            <Option value="Joaquin S. Oliveira, Secretario">Joaquin S. Oliveira</Option>
            <Option value="Florencia Marconi, Prosecretaria Coadyuvante">Florencia Marconi</Option>
            <Option value="Carolina Fiori, Prosecretaria Coadyuvante">Carolina Fiori</Option>
        </Select>
    </Form.Item>
);

export default ActuarioField;