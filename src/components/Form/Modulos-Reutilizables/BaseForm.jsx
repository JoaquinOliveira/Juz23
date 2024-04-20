// BaseForm.jsx
import React, { useState } from 'react';
import { Form, Button, Space, message } from 'antd';
import { useDispatch } from 'react-redux';
import { handleSubmit, generatePreview } from '../../../redux/formSlice';
import DocumentPreview from '../../Incompetencias/DocumentPreview';

const BaseForm = ({ subTipo, onFieldsChange, isFormValid, isSubmitting, isLoadingTemplate, formTitle, children }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState('');

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const result = await dispatch(handleSubmit(values)).unwrap();
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
            <h2 className="form-title hurto-title">{formTitle}</h2>
            <Form
                className="form-item"
                form={form}
                onFinish={onSubmit}
                onFieldsChange={onFieldsChange}
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
                            onClick={onSubmit}
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