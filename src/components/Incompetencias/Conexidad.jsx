import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Checkbox, Space, Button, Input, Select, message } from 'antd';
import { setFormValidity, setSubTipo, handleSubmit, generatePreview } from '../../redux/formSlice';
import './styles.css';
import DocumentPreview from './DocumentPreview'


const Conexidad = ({ subTipo }) => {
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

    const [selectedDelitos, setSelectedDelitos] = useState([]);
    const [selectedDelitosOtros, setSelectedDelitosOtros] = useState([])

    const delitos = [' amenazas', ' daños', ' lesiones', ' homicidio'];
    const delitosAjenos = [' homicidio', ' falsificacion', ' amenazas coactivas',]


    const onFieldsChange = (_, allFields) => {
        const requiredFields = ['fecha', 'causa', 'caratula', 'hechos', 'fiscal', 'delitos', 'delitosajenos', 'destino', 'causaajena'];
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


    const handleDelitosChange = (selectedValues) => {
        setSelectedDelitos(selectedValues);

    };
    const handleDelitosChange2 = (selectedValues) => {
        setSelectedDelitosOtros(selectedValues)
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
                    label="Delitos Nuestros"
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
                <Form.Item
                    className="form-item"
                    label="Destino"
                    name="destino"
                    rules={[{ required: true, message: 'El destino es obligatorio' }]}
                >
                    <Input placeholder="Agregue el Juzgado y departamento judicial al que la mandamos"/>
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Causa Ajena"
                    name="causaajena"
                    rules={[{ required: true, message: 'La causa del Juzgado de la conexidad es obligatorio' }]}
                >
                    <Input placeholder="Agregue el número de causa del Juzgado al cual se conexa"/>
                </Form.Item>
                <Form.Item
                    className="form-item"
                    label="Delitos Ajenos"
                    name="delitosajenos"
                >
                    <Select
                        mode="multiple"
                        placeholder="Seleccione los delitos de la conexidad"
                        onChange={handleDelitosChange2}
                    >
                        {delitosAjenos.map((delitos) => (
                            <Option key={delitos} value={delitos}>
                                <Checkbox checked={selectedDelitosOtros.includes(delitos)}>
                                    {delitos}
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

export default Conexidad;
