import React from "react";
import { Card, Row, Col } from "antd";
import { useAuth } from "../hooks/useAuth";
import "./Profile.css";

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="profile-no-user">
                <p>No user data available. Please log in.</p>
            </div>
        );
    }

    const { firstName, lastName, email, phone, image, title } = user;

    return (
        <Row gutter={[24, 24]} className="profile-container">
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                    hoverable
                    cover={
                        <img
                            alt={`${firstName} ${lastName}`}
                            src={image || "https://via.placeholder.com/250"}
                            className="profile-card-image"
                        />
                    }
                    className="profile-card"
                >
                    <Card.Meta
                        title={`${firstName} ${lastName}`}
                        description={
                            <>
                                <p className="profile-card-meta"><strong>Email:</strong> {email}</p>
                                <p className="profile-card-meta"><strong>Phone:</strong> {phone}</p>
                                <p className="profile-card-meta"><strong>Title:</strong> {title}</p>
                            </>
                        }
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default Profile;