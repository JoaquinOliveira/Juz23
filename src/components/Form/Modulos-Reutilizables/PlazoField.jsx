import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const PlazoField = () => (
    <Form.Item
        className="form-item"
        label="Tiempo de SPP"
        name="plazo"
        rules={[
            {
                required: true,
                message: 'El plazo de la SPP es obligatorio',
            },
        ]}
    >
        <Select placeholder="Seleccione el plazo de SPP">
            <Option value="un (1) año">1 año</Option>
            <Option value="dos (2) años">2 años</Option>
            <Option value="tres (3) años">3 años</Option>
        </Select>
    </Form.Item>
);

export default PlazoField; 