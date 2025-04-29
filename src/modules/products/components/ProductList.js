import React from "react";
import { Card, Pagination, Spin, Empty, Row, Col, Button, Typography } from "antd";
import { useProducts } from "../hooks/useProducts";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../../cart/hooks/useCart";
import styles from "./ProductList.css";

const { Title, Paragraph, Text } = Typography;

const ProductList = () => {
    const { addToCart } = useCart();
    const { products, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 8; // Number of products per page

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className={styles.productListLoading}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.productListError}>
                <Paragraph>Oops! {error}</Paragraph>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className={styles.productListEmpty}>
                <Empty description="No products found" />
            </div>
        );
    }

    // Paginate products
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

    return (
        <div className={styles.productListContainer}>
            <Row gutter={[24, 24]}>
                {paginatedProducts.map(({ id, title, description, price, thumbnail }) => (
                    <Col key={id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={title}
                                    src={thumbnail}
                                    className={styles.productCardImage}
                                />
                            }
                            className={styles.productCard}
                        >
                            <div className={styles.productCardMeta}>
                                <Title level={5} ellipsis={{ rows: 1 }} className={styles.productCardTitle}>
                                    {title}
                                </Title>
                                <Paragraph ellipsis={{ rows: 2 }} className={styles.productCardDescription}>
                                    {description}
                                </Paragraph>
                                <Text strong className={styles.productCardPrice}>
                                    ${price}
                                </Text>
                                <Button
                                    type="primary"
                                    block
                                    icon={<ShoppingCartOutlined />}
                                    className={styles.productCardButton}
                                    onClick={() => addToCart({ name: title, price })} // Add to cart handler
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={products.length}
                onChange={handlePageChange}
                className={styles.productListPagination}
                showSizeChanger={false}
            />
        </div>
    );
};

export default ProductList;
