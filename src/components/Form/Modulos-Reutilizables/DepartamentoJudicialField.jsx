import React from 'react';
import { Form, Input } from 'antd';

const DepartamentoJudicialField = () => (
    <Form.Item
        label="Departamento Judicial"
        name="departamentojudicial"
    >
        <Input placeholder="Ejemplo: Lomas de Zamora, Provincia de Buenos Aires" />
    </Form.Item>)

export default DepartamentoJudicialField