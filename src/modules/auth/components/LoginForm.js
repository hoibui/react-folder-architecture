import "./LoginForm.css";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Form, Input, Button, Typography, Alert, Card, Space } from "antd";

const { Title, Text } = Typography;

const LoginForm = () => {
    const [form] = Form.useForm();
    const { signIn, error, isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (values) => {
        const { email, password } = values;
        await signIn(email, password);
    };

    useEffect(() => {
        if (isAuthenticated) {
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath);
        }
    }, [isAuthenticated, navigate, location.state]);

    return (
        <div className="login-form-container">
            <Card className="login-form-card" bordered={false}>
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <Title level={2} className="login-form-title" style={{ textAlign: "center" }}>
                        Welcome Back
                    </Title>
                    <Text type="secondary" style={{ textAlign: "center", display: "block" }}>
                        Please login to your account
                    </Text>
                </Space>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    style={{ marginTop: "24px" }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please input your password!" },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" size="large" />
                    </Form.Item>

                    {error && (
                        <Alert
                            message="Login Failed"
                            description={error}
                            type="error"
                            showIcon
                            style={{ marginBottom: "16px" }}
                        />
                    )}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={isLoading}
                            size="large"
                            className="login-form-button"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
