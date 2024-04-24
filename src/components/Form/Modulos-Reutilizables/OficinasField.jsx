import React from 'react';
import { Form, Checkbox } from 'antd';



const FiscaliaField = () => {
    return (
        <Form.Item name="destino" label="Destinos">
            <Checkbox.Group>
                <Checkbox value="Al Sr. Jefe de la Policía Federal Argentina.">PFA</Checkbox>
                <Checkbox value="Al Sr. Director del Registro Nacional de Reincidencia.">Reincidencia</Checkbox>
                <Checkbox value="Al Sr. Jefe de la Policia de la Ciudad de Buenos Aires.">PCABA</Checkbox>
            </Checkbox.Group>
        </Form.Item>
    );
};

export default FiscaliaField;



