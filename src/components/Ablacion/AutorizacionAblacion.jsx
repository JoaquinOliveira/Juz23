import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, setSubTipo } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import FechaField from '../Form/Modulos-Reutilizables/FechaField';
import OrganosField from '../Form/Modulos-Reutilizables/OrganosField';
import ImputadoField from '../Form/Modulos-Reutilizables/ImputadoField';
import DniField from '../Form/Modulos-Reutilizables/DniField';
import HospitalField from '../Form/Modulos-Reutilizables/HospitalField';


const AutorizacionAblacion = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

 useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'imputado', 'dni', 'organos'];
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
            formTitle="Formulario de Resolución de Ablacion"
        >
            <FechaField />
            <HospitalField />
            <ImputadoField />
            <DniField />
            <OrganosField />
            
        </BaseForm>
    );
};

export default AutorizacionAblacion;