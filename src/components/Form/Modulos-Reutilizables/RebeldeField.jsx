import React, { useState } from 'react';
import { Form, Checkbox } from 'antd';

const RebeldiaField = () => {
    const [value, setValue] = useState([]);

    const handleChange = (checkedValues) => {
        setValue(checkedValues);
    };

    return (
        <Form.Item
            className="form-item"
            label="¿Estás comunicando una Rebeldia?"
            name="rebelde"
        >
            <Checkbox.Group onChange={handleChange} value={value}>
                <Checkbox value="rebelde">Sí</Checkbox>
            </Checkbox.Group>
        </Form.Item>
    );
};

export default RebeldiaField;