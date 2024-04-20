import React from 'react';
import { Form, InputNumber } from 'antd';

const nombresMeses = {
    1: 'un',
    2: 'dos',
    3: 'tres',
    4: 'cuatro',
    5: 'cinco',
    6: 'seis',
    7: 'siete',
    8: 'ocho',
    9: 'nueve',
    10: 'diez',
    11: 'once',
    12: 'doce',
};

const TiempoField = () => {
    const validateTiempo = (_, value) => {
        if (value < 1 || value > 12) {
            return Promise.reject('El tiempo debe ser un número entre 1 y 12');
        }
        return Promise.resolve();
    };

    const transformTiempo = (value) => {
        if (value && nombresMeses[value]) {
            return `${nombresMeses[value]} (${value}) ${value === 1 ? 'mes' : 'meses'}`;
        }
        return value;
    };

    return (
        <Form.Item
            className="form-item"
            label="Tiempo de SPP"
            name="tiempo"
            rules={[
                {
                    required: true,
                    message: 'El tiempo de la SPP es obligatorio',
                },
                {
                    validator: validateTiempo,
                },
            ]}
            getValueFromEvent={(value) => transformTiempo(value)}
        >
            <InputNumber min={1} max={12} placeholder="Ingrese el tiempo de la SPP en meses (1-12)" />
        </Form.Item>
    );
};

export default TiempoField;