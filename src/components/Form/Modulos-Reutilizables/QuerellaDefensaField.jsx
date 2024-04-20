import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const QuerellaDefensaField = () => {
    const [additionalFields, setAdditionalFields] = useState([]);

    const handleAdditionalFieldsChange = (selectedFields) => {
        setAdditionalFields(selectedFields);
    };

    return (
        <>
            {additionalFields.includes('denunciante') && (
                <Form.Item label="Defensa" name="defensa">
                    <Input placeholder="Ingrese qué dijo la Defensa" rows={1} />
                </Form.Item>
            )}
            {additionalFields.includes('querella') && (
                <Form.Item label="Querella" name="querella">
                    <TextArea placeholder="Ingrese qué dijo la Querella" rows={1} />
                </Form.Item>
            )}
            <Form.Item label="Campos adicionales" name="additionalFields">
                <Select
                    mode="multiple"
                    placeholder="Agrega campos si lo necesitás"
                    onChange={handleAdditionalFieldsChange}
                >
                    <Option value="denunciante">Defensa</Option>
                    <Option value="querella">Querella</Option>
                </Select>
            </Form.Item>
        </>
    );
};

export default QuerellaDefensaField;