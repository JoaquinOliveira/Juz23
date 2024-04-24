// ResolutionForm.jsx
import React, { useState, useMemo } from 'react';
import './ResolutionForm.css';
import { CSSTransition } from 'react-transition-group';
import { Select } from 'antd';
import { formComponentMap, resolutionTypes } from './formConfig';
import useBodyClassName from './useBodyClassName';

const { Option } = Select;

const ResolutionForm = () => {
    const [tipoResolucion, setTipoResolucion] = useState('');
    const [subTipoResolucion, setSubTipoResolucion] = useState('');

    useBodyClassName('light-mode');

    const resolutionTypesArray = useMemo(() => Object.keys(resolutionTypes), []);
    const subTypesArray = useMemo(() => resolutionTypes[tipoResolucion] || [], [tipoResolucion]);

    const handleTipoChange = (value) => {
        setTipoResolucion(value);
        setSubTipoResolucion('');
    };

    const handleSubTipoChange = (value) => {
        setSubTipoResolucion(value);
    };

    const renderFormularioEspecifico = () => {
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
                    className="prueba"
                    value={tipoResolucion}
                    onChange={handleTipoChange}
                    placeholder="Seleccione un tipo de resolución"
                >
                    {resolutionTypesArray.sort().map((tipo) => (
                        <Option key={tipo} value={tipo}>
                            {tipo}
                        </Option>
                    ))}
                </Select>
                <Select
                    className="prueba"
                    value={subTipoResolucion}
                    onChange={handleSubTipoChange}
                    placeholder="Seleccione un subtipo"
                    disabled={!tipoResolucion}
                >
                    {subTypesArray.sort().map((subtipo) => (
                        <Option key={subtipo} value={subtipo}>
                            {subtipo}
                        </Option>
                    ))}
                </Select>
            </div>
            {subTipoResolucion && (
                <CSSTransition
                    unmountOnExit
                    in={!!subTipoResolucion}
                    timeout={200}
                    classNames="form"
                >
                    <div className="form-container">{renderFormularioEspecifico()}</div>
                </CSSTransition>
            )}
        </>
    );
};

export default ResolutionForm;