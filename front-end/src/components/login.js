import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const API_BASE_URL = 'http://localhost:5000/api';

export function loginUser(email, password) {
    return axios.post(`${API_BASE_URL}/auth/login`, { email, password })
        .then(response => {
            return response.data; // Return the token
        })
        .catch(error => {
            // Handle login error
            console.error(error);
            throw error; // Rethrow the error
        });
}

export function Login({ toggleMode, handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle login submission
        loginUser(email, password)
            .then(token => {
                // Set the token to local storage
                localStorage.setItem('token', JSON.stringify(token));
                console.log("localStorage('token'):", localStorage.getItem('token'));
                handleLogin();
                // Redirect to the dashboard
                navigate('/dashboard');
            })
            .catch(error => {
                console.error(error);
                // TODO: show error message to the user
                setErrorMessage('Invalid email or password.')
            }
        );
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="login">
                        <h2>Login</h2>
                        {errorMessage && <p>{errorMessage}</p>} {/* Show error message if it exists */}
                        <p>afpaduelan@gmail.com</p>
                        <p>password</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={handleEmailChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">Login</Button>
                        </Form>

                        <Button variant="link" onClick={toggleMode}>Switch to Signup</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}