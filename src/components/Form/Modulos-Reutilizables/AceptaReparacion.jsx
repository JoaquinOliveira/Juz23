import { Form, Radio } from 'antd';
import { useState } from 'react';

const AceptacionReparacion = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <Form.Item
            className="form-item"
            label="¿Acepta o no acepta la reparación del daño?"
            name={value}
            rules={[{ required: true, message: 'Debe seleccionar una opción' }]}
        >
            <Radio.Group onChange={handleChange} value={value}>
                <Radio value="acepta">Acepta</Radio>
                <Radio value="noacepta">No acepta</Radio>
            </Radio.Group>
        </Form.Item>
    );
};

export default AceptacionReparacion;