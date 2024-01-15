import React, { useState } from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import obtenerUrlDescarga from '../firebase/firestore';
import { fillWordTemplate, downloadBlob } from '../utils/docProcessor';
import './FormNulidades.css'

const { TextArea } = Input;

const FormNulidades = ({ subTipo }) => {
    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState(false);

    const onFieldsChange = async (_, allFields) => {
        const isValid = allFields.every(field => !field.errors.length);
        setIsFormValid(isValid);
    };
    const handleSubmit = async (values) => {
        try {
            const nombreArchivoPlantilla = `${subTipo}.docx`;
            const templateUrl = await obtenerUrlDescarga(nombreArchivoPlantilla);
            const modifiedDocument = await fillWordTemplate(values, templateUrl);
            downloadBlob(modifiedDocument, `${subTipo}_modificado.docx`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            onFieldsChange={onFieldsChange}
            layout="vertical"
            requiredMark={false}
        >
         
                <Form.Item
                    label="Causa"
                    name="causa"
                    rules={[{ required: true, message: 'La causa es obligatoria' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Carátula"
                    name="caratula"
                    rules={[{ required: true, message: 'La carátula es obligatoria' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Imputado"
                    name="imputado"
                    rules={[{ required: true, message: 'El imputado es obligatorio' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Hechos"
                    name="hechos"
                    rules={[{ required: true, message: 'Los hechos son obligatorios' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Fiscalía"
                    name="fiscal"
                    rules={[{ required: false, message: 'La fiscalía es obligatoria' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Defensa"
                    name="defensa"
                    rules={[{ required: false, message: 'La defensa es obligatoria' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Querella"
                    name="querella"
                    rules={[{ required: false, message: 'La querella es obligatoria' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                <Row justify="center">
        <Col>
                    <Button type="primary" htmlType="submit" disabled={!isFormValid}>
                        Enviar
                    </Button>
                    </Col>
                    </Row>
                </Form.Item>
        </Form>
    );
};

export default FormNulidades;
