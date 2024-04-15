import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';

const Login = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) => {
        setLoading(true);

        // Aquí debes reemplazar con el usuario y contraseña válidos
        const validUsername = process.env.REACT_APP_USERNAME;
        const validPassword = process.env.REACT_APP_PASSWORD;

        if (values.username === validUsername && values.password === validPassword) {
            // Inicio de sesión exitoso
            message.success('Inicio de sesión exitoso');
            onLogin();
        } else {
            // Credenciales inválidas
            message.error('Credenciales inválidas');
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Usuario" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                </Form.Item>
                <Form.Item>
                    <Button className='login-button' type="primary" htmlType="submit" loading={loading}>
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;