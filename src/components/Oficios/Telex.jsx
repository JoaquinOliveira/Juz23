import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, setSubTipo } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import FechaField from '../Form/Modulos-Reutilizables/FechaField';
import CausaField from '../Form/Modulos-Reutilizables/CausaField';
import CaratulaField from '../Form/Modulos-Reutilizables/CaratulaField';
import ProveidoField from '../Form/Modulos-Reutilizables/ProveidoField';
import ImputadoField from '../Form/Modulos-Reutilizables/ImputadoField';
import ComisariaField from '../Form/Modulos-Reutilizables/ComisariaField';
import DomicilioField from '../Form/Modulos-Reutilizables/DomicilioField';


const Telex = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'imputado', 'comisaria', 'domicilio', 'proveido'];
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
            formTitle="Formulario de Telex"
        >
            <FechaField />
            <CausaField />
            <CaratulaField />
            <ComisariaField />
            <ImputadoField />
            <DomicilioField />
            <ProveidoField />
        </BaseForm>
    );
};

export default Telex;