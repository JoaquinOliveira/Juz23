// formSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import obtenerUrlDescarga from '../firebase/firestore';
import { fillWordTemplate, downloadBlob } from '../utils/docProcessor';
import { renderAsync } from 'docx-preview';


export const handleSubmit = createAsyncThunk(
    'form/handleSubmit',
    async (values, { dispatch, getState }) => {
        dispatch(setSubmitting(true));
        try {
            const subTipo = getState().form.subTipo;
            const nombreArchivoPlantilla = `${subTipo}.docx`;
            dispatch(setLoadingTemplate(true));
            const templateUrl = await obtenerUrlDescarga(nombreArchivoPlantilla);
            dispatch(setLoadingTemplate(false));
            console.log('Form Values:', values);
            const modifiedDocument = await fillWordTemplate(values, templateUrl);
            console.log('Template URL:', templateUrl);
            downloadBlob(modifiedDocument, `${subTipo}_modificado.docx`);
            console.log('Modified Document:', modifiedDocument);
            return 'El formulario se ha enviado correctamente';
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Ha ocurrido un error al enviar el formulario');
        } finally {
            dispatch(setSubmitting(false));
        }
    }
);

export const generatePreview = createAsyncThunk(
    'form/generatePreview',
    async (values, { dispatch, getState }) => {
        dispatch(setSubmitting(true));
        try {
            const subTipo = getState().form.subTipo;
            const nombreArchivoPlantilla = `${subTipo}.docx`;
            dispatch(setLoadingTemplate(true));
            const templateUrl = await obtenerUrlDescarga(nombreArchivoPlantilla);
            const modifiedDocument = await fillWordTemplate(values, templateUrl);
            const previewContainer = document.createElement('div');
            await renderAsync(modifiedDocument, previewContainer);
            const previewHtml = previewContainer.innerHTML;
            // ...
            dispatch(setLoadingTemplate(false));
            return previewHtml;



        } catch (error) {
            console.error('Error:', error);
            throw new Error('Ha ocurrido un error al generar la previsualización');
        } finally {
            dispatch(setSubmitting(false));
        }
    }
);
export const handleSubmitTipo = createAsyncThunk(
    'form/handleSubmit',
    async (formValues, { dispatch, getState }) => {
        dispatch(setSubmitting(true));
        try {
            const subTipo = getState().form.subTipo;
            const nombreArchivoPlantilla = `${subTipo}.docx`;
            dispatch(setLoadingTemplate(true));
            const templateUrl = await obtenerUrlDescarga(nombreArchivoPlantilla);
            dispatch(setLoadingTemplate(false));

            // Desestructurar los valores del formulario
            const { tipo, ...otherValues } = formValues;

            // Combinar los valores en un solo objeto
            const templateValues = {
                ...otherValues,
                [tipo]: true,
            };

            const modifiedDocument = await fillWordTemplate(templateValues, templateUrl);
            downloadBlob(modifiedDocument, `${subTipo}_modificado.docx`);
            return 'El formulario se ha enviado correctamente';
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Ha ocurrido un error al enviar el formulario');
        } finally {
            dispatch(setSubmitting(false));
        }
    }
);

const formSlice = createSlice({
    name: 'form',
    initialState: {
        isFormValid: false,
        isSubmitting: false,
        isLoadingTemplate: false,
        draftData: null,
        subTipo: '',
    },

    reducers: {
        setFormValidity: (state, action) => {
            state.isFormValid = action.payload;
        },
        setSubmitting: (state, action) => {
            state.isSubmitting = action.payload;
        },
        setLoadingTemplate: (state, action) => {
            state.isLoadingTemplate = action.payload;
        },
        setSubTipo: (state, action) => {
            state.subTipo = action.payload;
        },
        setPreviewUrl: (state, action) => {
            console.log(action.payload); //
            state.previewBlob = action.payload;
        },
    },

});

export const { setFormValidity, setSubmitting, setLoadingTemplate, setSubTipo, setPreviewBlob } = formSlice.actions;

export default formSlice.reducer;