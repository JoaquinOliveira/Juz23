import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const PautasField = ({rows}) => (
    <Form.Item
        className="form-item"
        label="Pautas"
        name="pautas"
        rules={[{ required: true, message: 'Las Pautas son obligatorias' }]}
    >
        <TextArea placeholder="Ingrese las pautas, con la numeración correspondiente" rows={rows} />
    </Form.Item>
);

export default PautasField;