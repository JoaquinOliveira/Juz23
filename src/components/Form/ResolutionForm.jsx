import React, { useState, useEffect } from 'react';
import './ResolutionForm.css';

import HomicidioCulposo from '../Incompetencias/HomicidioCulposo';
import Fraude from '../Incompetencias/Fraude';
import Hurto from '../Incompetencias/Hurto';
import Robo from '../Incompetencias/Robo';
import Territorio from '../Incompetencias/Territorio';
import Falsificacion from '../Incompetencias/Falsificacion';
import Conexidad from '../Incompetencias/Conexidad';
import Turno from '../Incompetencias/Turno'
import Coactivas from '../Incompetencias/Coactivas';

import { CSSTransition } from 'react-transition-group';
import { Select } from 'antd';
import Prematura from '../Incompetencias/Prematura';

const { Option } = Select;

const ResolutionForm = () => {
    const [tipoResolucion, setTipoResolucion] = useState('');
    const [subTipoResolucion, setSubTipoResolucion] = useState('');


    const tiposDeResolucion = {
        /* Nulidades: ['probando', 'requerimiento', 'investigacion', 'ha lugar'],
        Allanamiento: ['drogas', 'armas', 'pornografía', 'prueba'], */
        Incompetencias: [
            'coactivas',
            'falsificacion',
            'fraude',
            'territorio',
            'conexidad',
            'turno',
            'homicidio culposo',
            'robo',
            'hurto',
            'prematura',
        ],
    };
    const handleTipoChange = (value) => {
        setTipoResolucion(value);
        setSubTipoResolucion('');
    };

    const handleSubTipoChange = (value) => {
        setSubTipoResolucion(value);
    };

    useEffect(() => {
        document.body.classList.add('light-mode');
        return () => {
            document.body.classList.remove('light-mode');
        };
    }, []);


    const renderFormularioEspecifico = () => {
        const formComponentMap = {
          /*   Nulidades: {
                'probando': '',
                'tipo2': ''
            }, */
            Incompetencias: {
                'homicidio culposo': HomicidioCulposo,
                'fraude': Fraude,
                'falsificacion': Falsificacion,
                'hurto': Hurto,
                'robo': Robo,
                'territorio': Territorio,
                'conexidad': Conexidad,
                'turno': Turno,
                'coactivas': Coactivas,
                'prematura': Prematura,
            },
        };

        const FormComponent = formComponentMap[tipoResolucion]?.[subTipoResolucion];

        return FormComponent ? (
            <FormComponent subTipo={subTipoResolucion} />
        ) : (
            <p>
                {tipoResolucion
                    ? `Subtipo de ${tipoResolucion} no reconocido.`
                    : 'Tipo de resolución no reconocido.'}
            </p>
        );
    };

    return (
        <>
            <div className="select-container">
                <Select
                    className= "prueba"
                    value={tipoResolucion}
                    onChange={handleTipoChange}
                    placeholder="Seleccione un tipo de resolución"
                >
                    {Object.keys(tiposDeResolucion).sort().map((tipo) => (
                        <Option key={tipo} value={tipo}>
                            {tipo}
                        </Option>
                    ))}
                </Select>
                <Select
                    className='prueba'
                    value={subTipoResolucion}
                    onChange={handleSubTipoChange}
                    placeholder="Seleccione un subtipo"
                    disabled={!tipoResolucion}
                >
                    {tipoResolucion &&
                        tiposDeResolucion[tipoResolucion].sort().map((subtipo) => (
                            <Option key={subtipo} value={subtipo}>
                                {subtipo}
                            </Option>
                        ))}
                </Select>
            </div>

            <CSSTransition in={!!subTipoResolucion} timeout={300} classNames="form" unmountOnExit>
                <div className="form-container">{renderFormularioEspecifico()}</div>
            </CSSTransition>
        </>
    );
};

export default ResolutionForm;