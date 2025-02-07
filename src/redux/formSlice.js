// formSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import obtenerUrlDescarga from '../firebase/firestore';
import { fillWordTemplate, downloadBlob, downloadBlob2 } from '../utils/docProcessor';
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
            const modifiedDocument = await fillWordTemplate(values, templateUrl);
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
export const handleSubmitOficios = createAsyncThunk(
    'form/handleSubmitOficios',
    async (values, { dispatch, getState }) => {
        dispatch(setSubmitting(true));
        try {
            console.log('se està usando esta')
            const subTipo = getState().form.subTipo;
            const nombreArchivoPlantilla = `${subTipo}.docx`;
            dispatch(setLoadingTemplate(true));
            const templateUrl = await obtenerUrlDescarga(nombreArchivoPlantilla);
            dispatch(setLoadingTemplate(false));

            const { destino, ...restFormValues } = values;

            // Esperar a que cada oficio se genere y descargue
            for (const dest of destino) {
                let destinoNombre = '';
                let encabezado = '';

                switch (dest) {
                    case 'Al Sr. Jefe de la Policía Federal Argentina.':
                        destinoNombre = 'PFA';
                        encabezado = 'Al Sr. Jefe de la Policia Federal Argentina.';
                        break;
                    case 'Al Sr. Director del Registro Nacional de Reincidencia.':
                        destinoNombre = 'Reincidencia';
                        encabezado = 'Al Sr. Director del Registro Nacional de Reincidencia.';
                        break;
                    case 'Al Sr. Jefe de la Policia de la Ciudad de Buenos Aires.':
                        destinoNombre = 'PCABA';
                        encabezado = 'Al Sr. Jefe de la Policia de la Ciudad de Buenos Aires.';
                        break;
                    default:
                        break;
                }

                const modifiedFormValues = { ...restFormValues, destino: dest, encabezado };
                const modifiedDocument = await fillWordTemplate(modifiedFormValues, templateUrl);
                await downloadBlob2(modifiedDocument, `${subTipo}_${destinoNombre}.docx`); // Usar await aquí
            }

            return 'Los oficios se han generado correctamente';
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Ha ocurrido un error al generar los oficios');
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
            ; //
            state.previewBlob = action.payload;
        },
    },

});

export const { setFormValidity, setSubmitting, setLoadingTemplate, setSubTipo, setPreviewBlob } = formSlice.actions;

export default formSlice.reducer;