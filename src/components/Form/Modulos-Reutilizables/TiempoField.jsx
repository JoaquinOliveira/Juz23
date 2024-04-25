import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const TiempoField = () => {

    return (
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
            <Option value="un (1) mes">1</Option>
            <Option value="dos (2) meses">2 </Option>
            <Option value="tres (3) meses">3</Option>
            <Option value="cuatro (4) meses">4</Option>
            <Option value="cinco (5) meses">5</Option>
            <Option value="seis (6) meses">6</Option>
            <Option value="siete (7) meses">7</Option>
            <Option value="ocho (8) meses">8</Option>
            <Option value="nueve (9) meses">9</Option>
            <Option value="diez (10) meses">10</Option>
            <Option value="once (11) meses">11</Option>
            <Option value="doce (12) meses">12</Option>
        </Select>
    </Form.Item>)
}

export default TiempoField;