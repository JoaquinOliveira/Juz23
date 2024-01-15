import React, { useState } from 'react';
import './ResolutionForm.css'
import FormNulidades from './FormNulidades';
import FormPrueba from './FormPrueba'
import HomicidioCulposo from './Incompetencias/HomicidioCulposo';
import Fraude from './Incompetencias/Fraude';
import { CSSTransition } from 'react-transition-group';
import { Row, Col } from 'antd';


const ResolutionForm = () => {
    const [tipoResolucion, setTipoResolucion] = useState('');
    const [subTipoResolucion, setSubTipoResolucion] = useState('');
    const [showForm, setShowForm] = useState(false);

    const tiposDeResolucion = {
        Nulidades: ['probando',
            'requerimiento',
            'investigacion',
            'ha lugar',
        ],
        Allanamiento: ['drogas',
            'armas',
            'pornografía',
            'prueba',

        ],
        Incompetencias: [
            'coativas',
            'fraude',
            'territorio',
            'conexidad: multiples delitos',
            'turno',
            'homicidio culposo',
        ]
    }; // Tus tipos de resolución


    const handleTipoChange = (e) => {
        setTipoResolucion(e.target.value);
        setSubTipoResolucion('');
        setShowForm(false);
    };

    const handleSubTipoChange = (e) => {
        setSubTipoResolucion(e.target.value);
        setShowForm(true); // Mostrar formulario para el subtipo seleccionado
    };

    // Renderiza el formulario específico basado en la selección
    const renderFormularioEspecifico = () => {
        if (tipoResolucion === 'Nulidades') {
            switch (subTipoResolucion) {
                case 'probando':
                    return <FormNulidades subTipo={subTipoResolucion} />;
                case 'Tipo 2':
                    return <FormPrueba subTipo={subTipoResolucion} />;
                default:
                    return <p>Subtipo de Nulidades no reconocido.</p>;
            }

        }
        if (tipoResolucion === 'Incompetencias') {
            switch (subTipoResolucion) {
                case 'homicidio culposo':
                    return <HomicidioCulposo subTipo={subTipoResolucion} />;
                case 'fraude':
                    return <Fraude subTipo={subTipoResolucion} />;
                default:
                    return <p>Subtipo de Incompetencia no reconocido.</p>;
            }
        }
        return <p>Tipo de resolución no reconocido.</p>;
    };

    return (
        <>
            <Row gutter={16} justify="center">
                <Col style={{ textAlign: 'center' }}>
                    <select onChange={handleTipoChange} value={tipoResolucion} className="select-style">
                        <option value="">Resolución</option>
                        {Object.keys(tiposDeResolucion)
                            .sort()
                            .map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))
                        }
                    </select>
                </Col>
                <Col style={{ textAlign: 'center' }}>
                    <select
                        onChange={handleSubTipoChange}
                        value={subTipoResolucion}
                        className="select-style"
                        disabled={!tipoResolucion}
                    >
                        <option value="">Subtipo</option>
                        {tipoResolucion && tiposDeResolucion[tipoResolucion].sort()
                        .map(subtipo => (
                            <option key={subtipo} value={subtipo}>{subtipo}</option>
                        ))}
                    </select>
                </Col>
            </Row>

            <CSSTransition
                in={showForm}
                timeout={300}
                classNames="form"
                unmountOnExit
            >
                <div className="form-container">
                    {renderFormularioEspecifico()}
                </div>
            </CSSTransition>
        </>
    );
};

export default ResolutionForm;