// src/utils/docProcessor.js
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';


export const fillWordTemplate = async (formData, templateUrl) => {
    try {
        console.log('Form Data in fillWordTemplate:', formData);
        // Realiza la solicitud para obtener el Blob
        const response = await fetch(templateUrl);
        if (!response.ok) {
            throw new Error(`Error al descargar el archivo: ${response.statusText}`);
        }
        const templateArrayBuffer = await response.arrayBuffer();

        // Crear el documento con PizZip y Docxtemplater
        const zip = new PizZip(templateArrayBuffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        // Renderizar el documento con los datos del formulario
        doc.render(formData);


        // Generar el blob final
        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        

        return out;
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            throw new Error('El archivo de plantilla no existe en Firebase Storage');
        } else if (error.code === 'storage/unauthorized') {
            throw new Error('No tienes permiso para acceder al archivo de plantilla');
        } else {
            throw error;
        }
    }
};


export const downloadBlob = (blob, filename) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
