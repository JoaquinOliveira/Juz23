import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { setFormValidity, setSubTipo } from '../../redux/formSlice';
import PautasField from '../Form/Modulos-Reutilizables/PautasField';
import PlazosField from '../Form/Modulos-Reutilizables/PlazosField';
import FechaField from '../Form/Modulos-Reutilizables/FechaField';
import CausaField from '../Form/Modulos-Reutilizables/CausaField';
import CaratulaField from '../Form/Modulos-Reutilizables/CaratulaField';
import HechosField from '../Form/Modulos-Reutilizables/HechosField';
import ImputadoField from '../Form/Modulos-Reutilizables/ImputadoField';
import DamnificadoField from '../Form/Modulos-Reutilizables/DamnificadoField';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';

const HabeasCorpus = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);



    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);



    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'hechos', 'pautas', 'imputado', 'denunciante', 'plazo',];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        dispatch(setFormValidity(isValid));
    };


    return (
        <BaseForm
            subTipo={subTipo}
            onFieldsChange={onFieldsChange}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
            isLoadingTemplate={isLoadingTemplate}
            formTitle="Formulario de Medidas Preventivas"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <FechaField />
                    <CausaField />
                    <CaratulaField />
                    <HechosField />
                </Col>
                <Col span={12}>
                    <PautasField />
                    <ImputadoField />
                    <DamnificadoField />
                    <PlazosField />
                </Col>
            </Row>
        </BaseForm>
    );
};

export default HabeasCorpus