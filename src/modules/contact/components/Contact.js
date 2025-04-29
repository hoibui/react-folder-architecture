import React from "react";
import { Typography, Form, Input, Button, Row, Col, Card } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./Contact.css";

const { Title, Paragraph } = Typography;

const Contact = () => {
    return (
        <div className="contact-container">
            <Row gutter={[32, 32]} justify="center">
                <Col xs={24} md={12}>
                    <Card className="contact-card">
                        <Title level={2} className="contact-title">Get in Touch</Title>
                        <Paragraph className="contact-paragraph">
                            We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
                        </Paragraph>
                        <Form layout="vertical" className="contact-form">
                            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}> 
                                <Input placeholder="Your Name" />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}> 
                                <Input placeholder="Your Email" />
                            </Form.Item>
                            <Form.Item label="Message" name="message" rules={[{ required: true, message: "Please enter your message" }]}> 
                                <Input.TextArea rows={4} placeholder="Your Message" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>Send Message</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card className="contact-info-card">
                        <Title level={3} className="contact-info-title">Contact Information</Title>
                        <Paragraph className="contact-info-item">
                            <EnvironmentOutlined /> 123 Modern Street, New York, NY 10001
                        </Paragraph>
                        <Paragraph className="contact-info-item">
                            <PhoneOutlined /> +1 (555) 123-4567
                        </Paragraph>
                        <Paragraph className="contact-info-item">
                            <MailOutlined /> support@example.com
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Contact;