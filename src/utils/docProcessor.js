// src/utils/docProcessor.js
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';


export const fillWordTemplate = async (formData, templateUrl) => {
    try {
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
        console.log("Blob generado:", out);

        return out;
    } catch (error) {
        console.error("Error al procesar el documento:", error);
        throw error; // Relanzar el error para un manejo más arriba en la cadena
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
