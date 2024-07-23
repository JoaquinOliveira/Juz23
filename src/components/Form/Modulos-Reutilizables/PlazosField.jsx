import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const PlazosField = () => (
    <Form.Item
        className="form-item"
        label="Plazo de las medidas"
        name="plazo"
        rules={[
            {
                required: true,
                message: 'El plazo de las medidas es obligatorio',
            },
        ]}
    >
        <Select placeholder="Seleccione el plazo">
            <Option value="quince (15) días">15 días</Option>
            <Option value="treinta (30) días">30 días</Option>
            <Option value="cuarenta y cinco (45) días">45 días</Option>
            <Option value="sesenta (60) días">60 días</Option>
            <Option value="noventa (90) días">90 días</Option>

        </Select>
    </Form.Item>
);

export default PlazosField; 