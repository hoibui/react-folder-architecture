import React from "react";
import "./Home.css";
import { Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import homeImage from "../../../assets/images/home.jpg";

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();

    const handleShopNowClick = () => {
        navigate("/products");
    };

    return (
        <div className="home-container">
            <Row gutter={[32, 32]} align="middle" justify="center" className="home-row">
                <Col xs={24} md={12}>
                    <div className="home-content">
                        <Title className="home-title">
                            Discover the Best Products for Your Needs
                        </Title>
                        <Paragraph className="home-paragraph">
                            Shop from thousands of top brands with amazing discounts. Fast delivery and best customer service guaranteed.
                        </Paragraph>
                        <Button type="primary" size="large" className="home-button" onClick={handleShopNowClick}>
                            Shop Now
                        </Button>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className="home-image-wrapper">
                        <img src={homeImage} alt="Shop Now" className="home-image" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
