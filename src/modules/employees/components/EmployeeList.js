import React from "react";
import { Card, Row, Col, Spin, Empty } from "antd";
import { useEmployees } from "../hooks/useEmployees";
import "./EmployeeList.css";

const EmployeeList = () => {
    const { employees, loading, error } = useEmployees();

    if (loading) {
        return (
            <div className="employee-list-loading">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="employee-list-error">
                <p>Oops! {error}</p>
            </div>
        );
    }

    if (!employees.length) {
        return (
            <div className="employee-list-empty">
                <Empty description="No employees found" />
            </div>
        );
    }

    return (
        <Row gutter={[24, 24]} className="employee-list-container">
            {employees.map(({ id, firstName, lastName, email, phone, image, title }) => (
                <Col key={id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                        hoverable
                        cover={
                            <img
                                alt={`${firstName} ${lastName}`}
                                src={image}
                                className="employee-card-image"
                            />
                        }
                        className="employee-card"
                    >
                        <Card.Meta
                            title={`${firstName} ${lastName}`}
                            description={
                                <>
                                    <p className="employee-card-meta"><strong>Email:</strong> {email}</p>
                                    <p className="employee-card-meta"><strong>Phone:</strong> {phone}</p>
                                    <p className="employee-card-meta"><strong>Title:</strong> {title}</p>
                                </>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default EmployeeList;
