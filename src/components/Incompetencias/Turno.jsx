import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, message, Input, Select, Space } from 'antd';
import { setFormValidity, setSubTipo, generatePreview, handleSubmitTipo } from '../../redux/formSlice';
import './styles.css';
import DocumentPreview from './DocumentPreview';



const Turno = ({ subTipo }) => {
    const dispatch = useDispatch();
    const isFormValid = useSelector((state) => state.form.isFormValid);
    const isSubmitting = useSelector((state) => state.form.isSubmitting);
    const isLoadingTemplate = useSelector((state) => state.form.isLoadingTemplate);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState('');
    const [selectedTipo, setSelectedTipo] = useState(null);

    const { TextArea } = Input;
    const { Option } = Select;

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(setSubTipo(subTipo));
    }, [dispatch, subTipo]);

    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'hechos', 'zona', 'tipo', 'juzgado', 'comuna'];
        const isValid = requiredFields.every((field) => {
            const fieldValue = allFields.find((f) => f.name[0] === field);
            return fieldValue && fieldValue.errors.length === 0 && fieldValue.touched;
        });
        dispatch(setFormValidity(isValid));
    };

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const fileContent = await dispatch(generatePreview({ ...values, [selectedTipo]: true })).unwrap();
            const formValues = {
                ...values,
                tipo: selectedTipo,
                fileContent,
            };
            setTimeout(async () => {
                const result = await dispatch(handleSubmitTipo(formValues));
                message.success(result.payload);
            }, 0);
        } catch (error) {
            message.error(error.message);
        }
    };

    const handlePreview = async () => {
        try {
            const values = await form.validateFields();
            const fileContent = await dispatch(generatePreview({ ...values, [selectedTipo]: true })).unwrap();
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
            <h2 className="form-title hurto-title"> Formulario de Turno</h2>
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
                    label="Tipo"
                    name="tipo"
                    rules={[{ required: true, message: 'El tipo de incompetencia es obligatorio' }]}
                >
                    <Select
                        placeholder="Selecciona el tipo de incompetencia"
                        onChange={(value) => setSelectedTipo(value)}
                    >
                        <Option value="jurisdiccion">Jurisdicción</Option>
                        <Option value="denuncia">Denuncia</Option>
                        <Option value="flagrancia">Flagrancia</Option>
                    </Select>
                </Form.Item>
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
                    label="Zona"
                    name="zona"
                    rules={[{ required: true, message: 'La zona es obligatoria' }]}
                >
                    <Select mode="multiple" placeholder="Selecciona las zonas">
                        <Option value="Zona A">Zona A</Option>
                        <Option value="Zona B">Zona B</Option>
                        <Option value="Zona C">Zona C</Option>
                        <Option value="Zona D">Zona D</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Comuna"
                    name="comuna"
                    rules={[
                        { required: true, message: 'La Comuna es obligatoria' },
                    ]}
                >
                    <Input placeholder="Ingrese el número de la Comuna" />
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Juzgado"
                    name="juzgado"
                    rules={[
                        { required: true, message: 'El Juzgado es obligatorio' },
                        {
                            pattern: /^(0?[1-9]|[12][0-9]|3[01])$/,
                            message: 'Ingrese el número del Juzgado del 1 al 31',
                        },
                    ]}
                >
                    <Input placeholder="Ingrese el número del Juzgado" />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button
                            className="form-button"
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

export default Turno;