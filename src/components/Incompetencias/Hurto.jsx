import React, { useState } from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import obtenerUrlDescarga from '../../firebase/firestore';
import { fillWordTemplate, downloadBlob } from '../../utils/docProcessor';
import './styles.css';

const { TextArea } = Input;
const { Option } = Select;

const Hurto = ({ subTipo }) => {
    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'hechos', 'fiscal'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        setIsFormValid(isValid);
    };

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const nombreArchivoPlantilla = `${subTipo}.docx`;
            setIsLoadingTemplate(true);
            const templateUrl = await obtenerUrlDescarga(nombreArchivoPlantilla);
            setIsLoadingTemplate(false);
            const modifiedDocument = await fillWordTemplate(values, templateUrl);
            downloadBlob(modifiedDocument, `${subTipo}_modificado.docx`);
            message.success('El formulario se ha enviado correctamente');
        } catch (error) {
            console.error('Error:', error);
            message.error('Ha ocurrido un error al enviar el formulario');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <h2 className="form-title hurto-title"> Formulario de Hurto</h2>
            <Form
                className="form-item"
                form={form}
                onFinish={handleSubmit}
                onFieldsChange={onFieldsChange}
                layout="vertical"
                requiredMark={false}
            >
                <Form.Item
                    className="form-item"
                    label="Fecha"
                    name="fecha"
                    rules={[
                        { required: true, message: 'La fecha es obligatoria' },
                        {
                            pattern: /^\d{1,2} de [a-zA-Z]+ de \d{4}$/,
                            message: 'Ingrese una fecha válida en formato "día de mes de año"',
                        },
                    ]}
                >
                    <Input placeholder="Ejemplo: 30 de diciembre de 2024" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Causa"
                    name="causa"
                    rules={[{ required: true, message: 'La causa es obligatoria' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Carátula"
                    name="caratula"
                    rules={[{ required: true, message: 'La carátula es obligatoria' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Hechos"
                    name="hechos"
                    rules={[{ required: true, message: 'Los hechos son obligatorios' }]}
                >
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Fiscalía"
                    name="fiscal"
                    rules={[{ required: true, message: 'La fiscalía es obligatoria' }]}
                >
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Defensa"
                    name="defensa"
                >
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                    label="Querella"
                    name="querella"
                >
                    <TextArea rows={1} />
                </Form.Item>


                <Form.Item>
                    <Button
                        className="form-button"
                        type="primary"
                        htmlType="submit"
                        disabled={!isFormValid || isSubmitting || isLoadingTemplate}
                    >
                        {isSubmitting || isLoadingTemplate ? 'Cargando...' : 'Enviar'}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Hurto;