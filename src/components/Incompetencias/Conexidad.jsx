
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Checkbox, Button, Input, Select, message } from 'antd';
import { setFormValidity, setSubTipo } from '../../redux/formSlice';
import './styles.css';
import obtenerUrlDescarga from '../../firebase/firestore';
import { fillWordTemplate, downloadBlob } from '../../utils/docProcessor';

const Conexidad = ({ subTipo }) => {
    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

    const { TextArea } = Input;
    const { Option } = Select;

    const [form] = Form.useForm();


    const [additionalFields, setAdditionalFields] = useState([]);
    const handleAdditionalFieldsChange = (selectedFields) => {
        setAdditionalFields(selectedFields);
    };

    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const [selectedDelitos, setSelectedDelitos] = useState([]);

    const delitos = ['Delito 1', 'Delito 2', 'Delito 3', 'Delito 4'];

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'hechos', 'fiscal'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        dispatch(setFormValidity(isValid));
    };

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const nombreArchivoPlantilla = `${subTipo}.docx`;
            setIsLoadingTemplate(true);
            const templateUrl = await obtenerUrlDescarga(nombreArchivoPlantilla);
            setIsLoadingTemplate(false);

            // Agregar los delitos seleccionados a los valores del formulario
            const valoresConDelitos = {
                ...values,
                delitos: selectedDelitos,
            };

            const modifiedDocument = await fillWordTemplate(valoresConDelitos, templateUrl);
            downloadBlob(modifiedDocument, `${subTipo}_modificado.docx`);
            message.success('El formulario se ha enviado correctamente');
        } catch (error) {
            console.error('Error:', error);
            message.error('Ha ocurrido un error al enviar el formulario');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelitosChange = (selectedValues) => {
        setSelectedDelitos(selectedValues);
    };


    return (
        <>
            <h2 className="form-title hurto-title"> Formulario de {subTipo}</h2>
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
                    label="Delitos"
                    name="delitos"
                >
                    <Select
                        mode="multiple"
                        placeholder="Seleccione los delitos de nuestra causa"
                        onChange={handleDelitosChange}
                    >
                        {delitos.map((delito) => (
                            <Option key={delito} value={delito}>
                                <Checkbox checked={selectedDelitos.includes(delito)}>
                                    {delito}
                                </Checkbox>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                {additionalFields.includes('defensa') && (
                    <Form.Item
                        className="form-item"
                        label="Defensa"
                        name="defensa"
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                )}

                {additionalFields.includes('querella') && (
                    <Form.Item
                        label="Querella"
                        name="querella"
                    >
                        <TextArea rows={1} />
                    </Form.Item>
                )}
                <Form.Item
                    label="Campos adicionales"
                    name="additionalFields"
                >
                    <Select
                        mode="multiple"
                        placeholder="Agrega campos si lo necesitás"
                        onChange={handleAdditionalFieldsChange}
                    >
                        <Option value="defensa">Defensa</Option>
                        <Option value="querella">Querella</Option>
                    </Select>
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

export default Conexidad;
