import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import bcrypt from 'bcryptjs';


const Login = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);

        const validUsername = process.env.REACT_APP_USERNAME;
        const validPassword = process.env.REACT_APP_PASSWORD;

        console.log('Usuario ingresado:', values.username);
        console.log('Usuario válido:', validUsername);
        console.log('Contraseña ingresada:', values.password);
        console.log('Contraseña válida:', validPassword);

        console.log('Tipo de dato de la contraseña ingresada:', typeof values.password);
        console.log('Tipo de dato de la contraseña válida:', typeof validPassword);
        try {
            const passwordMatch = bcrypt.compare(values.password, validPassword);

            console.log('Resultado de la comparación de contraseñas:', passwordMatch);

            if (values.username === validUsername && passwordMatch) {
                message.success('Inicio de sesión exitoso');
                onLogin();
            } else {
                message.error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al comparar las contraseñas:', error);
            message.error('Error al iniciar sesión');
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