import React from 'react';
import { Form, Select, Checkbox } from 'antd';

const DelitosField = () => {
    const { Option } = Select;

    const delitos = [' amenazas', ' daños', ' lesiones', ' homicidio'];

    return (
        <Form.Item className="form-item" label="Delitos Nuestros" name="delitos">
            <Select mode="multiple" placeholder="Seleccione los delitos de nuestra causa">
                {delitos.map((delito) => (
                    <Option key={delito} value={delito}>
                        <Checkbox>{delito}</Checkbox>
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default DelitosField;