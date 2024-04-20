import React from 'react';
import { Form, Select, Checkbox } from 'antd';

const DelitosAjenosField = () => {
    const { Option } = Select;

    const delitosAjenos = [' homicidio', ' falsificacion', ' amenazas coactivas'];

    return (
        <Form.Item className="form-item" label="Delitos Ajenos" name="delitosajenos">
            <Select mode="multiple" placeholder="Seleccione los delitos de la conexidad">
                {delitosAjenos.map((delito) => (
                    <Option key={delito} value={delito}>
                        <Checkbox>{delito}</Checkbox>
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default DelitosAjenosField;