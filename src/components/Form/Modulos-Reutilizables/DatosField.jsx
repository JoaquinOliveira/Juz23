import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const DatosField = () => (
  <Form.Item
    className="form-item"
    label="Datos de la parte imputada"
    name="datos"
    rules={[{ required: true, message: 'Los datos de la parte imputada son obligatorios' }]}
  >
    <TextArea rows={3} placeholder="Ingrese los datos de la parte imputada (DNI, fecha de nac, defensa, etc)" />
  </Form.Item>
);

export default DatosField;