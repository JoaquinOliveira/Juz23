import React from 'react';
import { Form, Select } from 'antd';

const ZonaField = () => {
    const { Option } = Select;

    return (
        <Form.Item
            className="form-item"
            label="Zona"
            name="zona"
            rules={[{ required: true, message: 'La zona es obligatoria' }]}
        >
            <Select mode="multiple" placeholder="Selecciona las zonas">
                <Option value="Zona A">Zona A</Option>
                <Option value="Zona B">Zona B</Option>
                <Option value="Zona C">Zona C</Option>
                <Option value="Zona D">Zona D</Option>
            </Select>
        </Form.Item>
    );
};

export default ZonaField;