// BaseForm.jsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Space, message } from 'antd';
import { useDispatch } from 'react-redux';
import { handleSubmit, generatePreview, handleSubmitOficios, handleSubmitTipo } from '../../../redux/formSlice';
import DocumentPreview from '../../Incompetencias/DocumentPreview';

const BaseForm = ({ subTipo, onFieldsChange, isFormValid, isSubmitting, isLoadingTemplate, formTitle, children }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState('');


    
    useEffect(() => {
        const loadFormData = () => {
            const savedData = localStorage.getItem(`formData_${subTipo}`);    
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                
                const formValues = parsedData.reduce((acc, field) => {
                    if (field.name && field.name.length > 0) {
                        acc[field.name[0]] = field.value;
                    }
                    return acc;
                }, {});
                form.setFieldsValue(formValues);
            }
        };

        loadFormData();
    }, [subTipo, form]);

    const saveFormData = (values) => {
        // Verificar si todos los campos del formulario están vacíos
        const isFormEmpty = values.every((field) => {
            if (field.value === '' || field.value === null || field.value === undefined) {
                return true;
            }
            return false;
        });

        if (isFormEmpty) {
            localStorage.removeItem(`formData_${subTipo}`);
        } else {
            localStorage.setItem(`formData_${subTipo}`, JSON.stringify(values));
        }
    };

    const handleFieldsChange = (changedFields, allFields) => {
        saveFormData(allFields);
        onFieldsChange && onFieldsChange(changedFields, allFields);
    };

    const onSubmit = async () => {
        console.log('uso? = onsubmit')
        try {
            const values = await form.validateFields();
            const result = await dispatch(handleSubmit(values)).unwrap();
            localStorage.removeItem(`formData_${subTipo}`);
            message.success(result.payload);
        } catch (error) {
            message.error(error.message);
        }
    };

    const onSubmitOficios = async () => {
        console.log('uso? = onsubmitOficios')
        try {
            const values = await form.validateFields();
            const result = await dispatch(handleSubmitOficios(values)).unwrap();
            localStorage.removeItem(`formData_${subTipo}`);
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

    const getOnSubmitFunction = () => {
        console.log(subTipo)
        if (subTipo === 'comunica') {
            return onSubmitOficios;
        }
        return onSubmit;
    };
    
    const onSubmitFunction = getOnSubmitFunction();

    return (
        <>
            <h2 className="form-title hurto-title">{formTitle}</h2>
            <Form
                className="form-item"
                form={form}
                onFinish={onSubmitFunction}
                onFieldsChange={handleFieldsChange}
                layout="vertical"
                requiredMark={false}
            >
                {children}
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
                            onClick={onSubmitFunction}
                            className="form-button"
                            type="primary"
                            htmlType="submit"
                            disabled={!isFormValid || isSubmitting || isLoadingTemplate}
                            size="large"
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

export default BaseForm;