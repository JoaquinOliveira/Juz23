import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, setSubTipo } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import FechaField from '../Form/Modulos-Reutilizables/FechaField';
import CausaField from '../Form/Modulos-Reutilizables/CausaField';
import CaratulaField from '../Form/Modulos-Reutilizables/CaratulaField';
import ImputadoField from '../Form/Modulos-Reutilizables/ImputadoField';
import DatosField from '../Form/Modulos-Reutilizables/DatosField';
import DiaField from '../Form/Modulos-Reutilizables/DiaField';
import ResolutionField from '../Form/Modulos-Reutilizables/ResolutionField'
import OficinasField from '../Form/Modulos-Reutilizables/OficinasField'
import RebeldeField from '../Form/Modulos-Reutilizables/RebeldeField'


const Comunica = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'destino'];
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
            formTitle="Formulario de Comunicación"

        >
            <FechaField />
            <CausaField />
            <CaratulaField />
            <ImputadoField />
            <DatosField />
            <DiaField />
            <ResolutionField />
            <OficinasField />
            <RebeldeField />
        </BaseForm>
    );
};

export default Comunica;