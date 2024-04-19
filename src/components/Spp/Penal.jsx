import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, message, Input, Select, Space } from 'antd';
import { setFormValidity, setSubTipo, handleSubmit, generatePreview } from '../../redux/formSlice';
import '../Incompetencias/styles.css';
import DocumentPreview from '../Incompetencias/DocumentPreview';


const Penal = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState('');

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

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'hora', 'causa', 'caratula', 'hechos', 'fiscal', 'datos', 'plazo', 'pautas', 'reparacion', 'actuario', 'delito', 'defensa', 'imputado'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        dispatch(setFormValidity(isValid));
    };

    const onSubmit = async (values) => {
        try {
            const result = await dispatch(handleSubmit(values));
            message.success(result.payload);
        } catch (error) {
            message.error(error.message);
        }
    };

    const handlePreview = async () => {
        try {
            const values = await form.validateFields();
            const fileContent = await dispatch(generatePreview(values)).unwrap();
            setPreviewContent(fileContent);
            setIsPreviewOpen(true);
        } catch (error) {
            message.error(error.message);
        }
    };


    const handleClosePreview = () => {
        setIsPreviewOpen(false);
        setPreviewContent('');
    };

   
    return (
        <>
            <h2 className="form-title hurto-title"> Formulario de Spp Penal</h2>
            <Form
                className="form-item"
                form={form}
                onFinish={onSubmit}
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
                    label="Hora"
                    name="hora"
                    rules={[
                        { required: true, message: 'La hora es obligatoria' },
                        {
                            pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]\shoras$/,
                            message: 'Ingrese una hora válida en formato "XX:XX horas"',
                        },
                    ]}
                >
                    <Input placeholder="Ejemplo: 10:15 horas" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Causa"
                    name="causa"
                    rules={[{ required: true, message: 'La causa es obligatoria' }]}
                >
                    <Input placeholder="Número de causa" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Carátula"
                    name="caratula"
                    rules={[{ required: true, message: 'La carátula es obligatoria' }]}
                >
                    <Input placeholder="Carátula" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Imputado"
                    name="imputado"
                    rules={[{ required: true, message: 'El imputado es obligatorio' }]}
                >
                    <Input placeholder="Ingrese el nombre completo del imputad" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Datos de la parte imputada"
                    name="datos"
                    rules={[{ required: true, message: 'Los datos de la parte imputada son obligatorios' }]}
                >
                    <TextArea rows={3} placeholder="Ingrese los datos de la parte imputada (DNI, fecha de nac, defensa, etc)" />
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="Tiempo de SPP"
                    name="plazo"
                    rules={[
                        {
                            required: true,
                            message: 'El plazo de la SPP es obligatorio',
                        },
                    ]}
                >
                    <Select placeholder="Seleccione el plazo de SPP">
                        <Select.Option value="un (1) año">1 año</Select.Option>
                        <Select.Option value="dos (2) años">2 años</Select.Option>
                        <Select.Option value="tres (3) años">3 años</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Pautas de SPP"
                    name="pautas"
                    rules={[{ required: true, message: 'Las Pautas son obligatorias' }]}
                >
                    <Input placeholder="Ingrese las pautas, con la numeración correspondiente" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Reparación"
                    name="reparacion"
                    rules={[{ required: true, message: 'La reparación es obligatoria' }]}
                >
                    <Input placeholder="Ingrese la reparación del daño" />
                </Form.Item>

                <Form.Item
                    className="form-item"
                    label="Reparación"
                    name="reparacion"
                    rules={[{ required: true, message: 'La reparación es obligatoria' }]}
                >
                    <Input placeholder="Ingrese la reparación del daño" />
                </Form.Item>



                <Form.Item
                    className="form-item"
                    label="Actuario"
                    name="actuario"
                    rules={[{ required: true, message: 'El actuario es obligatorio' }]}
                >
                    <Select placeholder="Seleccione un actuario">
                        <Select.Option value="Javier Lombardo, Secretario">Javier Lombardo</Select.Option>
                        <Select.Option value="Joaquin S. Oliveira, Secretario">Joaquin S. Oliveira</Select.Option>
                        <Select.Option value="Florencia Marconi, Prosecretaria Coadyuvante">Florencia Marconi</Select.Option>
                        <Select.Option value="Carolina Fiori, Prosecretaria Coadyuvante">Carolina Fiori</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Hechos"
                    name="hechos"
                    rules={[{ required: true, message: 'Los hechos son obligatorios' }]}
                >
                    <TextArea placeholder="Ingrese los hechos" rows={1} />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Delito"
                    name="delito"
                    rules={[{ required: true, message: 'El delito es obligatorio' }]}
                >
                    <Input placeholder="Ingrese el delito que se le imputa" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Fiscal"
                    name="fiscal"
                    rules={[{ required: true, message: 'La fiscalía es obligatoria' }]}
                >
                    <Input placeholder="Ingrese el Fiscal presente y la Fiscalía. Ej: José Silvie, Fiscalía PCyF Nº 10" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Defensa"
                    name="defensa"
                    rules={[{ required: true, message: 'La defensa es obligatoria' }]}
                >
                    <Input placeholder="Ingrese el defensor presente y la defensoría. Ej: Andrea Piesco, Defensoría PCyF Nº " />
                </Form.Item>


                {additionalFields.includes('denunciante') && (
                    <Form.Item
                        label="Parte damnificada"
                        name="denunciante"
                    >
                        <Input placeholder="Ingrese el nombre de la parte damnificada, si corresponde" />
                    </Form.Item>
                )}

                {additionalFields.includes('querella') && (
                    <Form.Item
                        label="Querella"
                        name="querella"
                    >
                        <TextArea placeholder="Ingrese qué dijo la Querella" rows={1} />
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
                        <Option value="denunciante">Parte damnificada</Option>
                        <Option value="querella">Querella</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            className="form-button preview-button"
                            type="primary"
                            onClick={handlePreview}
                            disabled={!isFormValid || isSubmitting || isLoadingTemplate}
                            size="large"
                        >
                            {isSubmitting || isLoadingTemplate ? '...' : 'Preview'}
                        </Button>
                        <Button
                            onClick={onSubmit}
                            className="form-button"
                            type="primary"
                            htmlType="submit"
                            disabled={!isFormValid || isSubmitting || isLoadingTemplate}
                            size='large'
                        >
                            {isSubmitting || isLoadingTemplate ? '...' : 'Enviar'}
                        </Button>
                    </Space>
                </Form.Item>
                <DocumentPreview
                    fileContent={previewContent}
                    isOpen={isPreviewOpen}
                    onClose={handleClosePreview}
                />
            </Form>
        </>
    );
};

export default Penal;