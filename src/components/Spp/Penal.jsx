import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValidity, setSubTipo } from '../../redux/formSlice';
import BaseForm from '../Form/Modulos-Reutilizables/BaseForm';
import FechaField from '../Form/Modulos-Reutilizables/FechaField';
import CausaField from '../Form/Modulos-Reutilizables/CausaField';
import CaratulaField from '../Form/Modulos-Reutilizables/CaratulaField';
import HechosField from '../Form/Modulos-Reutilizables/HechosField';
import ImputadoField from '../Form/Modulos-Reutilizables/ImputadoField';
import DelitoField from '../Form/Modulos-Reutilizables/DelitoField';
import HoraField from '../Form/Modulos-Reutilizables/HoraField';
import DatosField from '../Form/Modulos-Reutilizables/DatosField';
import PlazoField from '../Form/Modulos-Reutilizables/PlazoField';
import PautasField from '../Form/Modulos-Reutilizables/PautasField';
import ReparacionField from '../Form/Modulos-Reutilizables/ReparacionField';
import AceptacionReparacion from '../Form/Modulos-Reutilizables/AceptaReparacion';
import ActuarioField from '../Form/Modulos-Reutilizables/ActuarioField';
import FiscalField from '../Form/Modulos-Reutilizables/FiscalField';
import DefensaField from '../Form/Modulos-Reutilizables/DefensaField';
import DamnificadoField from '../Form/Modulos-Reutilizables/DamnificadoField';
import QuerellaDefensaField from '../Form/Modulos-Reutilizables/QuerellaDefensaField';

const Penal = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'hora', 'causa', 'caratula', 'hechos', 'fiscal', 'datos', 'plazo', 'pautas', 'reparacion', 'actuario', 'delito', 'defensa', 'imputado'];
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
            formTitle="Formulario de Spp Penal"
        >
            <FechaField />
            <HoraField />
            <CausaField />
            <CaratulaField />
            <ActuarioField />
            <ImputadoField />
            <DatosField />
            <DelitoField />
            <FiscalField />
            <DefensaField />
            <DamnificadoField />
            <HechosField rows={1} />
            <PlazoField />
            <PautasField />
            <ReparacionField />
            <AceptacionReparacion />
            <QuerellaDefensaField />
        </BaseForm>
    );
};

export default Penal;