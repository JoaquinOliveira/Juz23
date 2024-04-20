import React from 'react';
import { Form, Select } from 'antd';

const TipoField = () => {
    const { Option } = Select;

    return (
        <Form.Item
            className="form-item"
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: 'El tipo de incompetencia es obligatorio' }]}
        >
            <Select placeholder="Selecciona el tipo de incompetencia">
                <Option value="jurisdiccion">Jurisdicción</Option>
                <Option value="denuncia">Denuncia</Option>
                <Option value="flagrancia">Flagrancia</Option>
            </Select>
        </Form.Item>
    );
};

export default TipoField;