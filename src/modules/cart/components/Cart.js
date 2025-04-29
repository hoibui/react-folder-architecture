import React from "react";
import { Table, Typography, Divider, Row, Col, Empty, Button, Space } from "antd";
import { useCart } from "../../cart/hooks/useCart";
import styles from "./Cart.css"; // Correct import for scoped styles

const { Title } = Typography;

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    // Group items by name
    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = { ...item, quantity: 0 };
        }
        acc[item.name].quantity += item.quantity || 1;
        return acc;
    }, {});

    const groupedList = Object.values(groupedItems);

    // Calculate total price
    const totalPrice = groupedList.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const columns = [
        {
            title: "Item",
            dataIndex: "name",
            key: "name",
            render: (text) => (
                <div className={styles.avatarItem}>
                    {text}
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `$${(price ? price.toFixed(2) : "0.00")}`
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity, record) => (
                <Space>
                    <Button size="small" onClick={() => updateQuantity(record.name, quantity - 1)}>-</Button>
                    <span>{quantity}</span>
                    <Button size="small" onClick={() => updateQuantity(record.name, quantity + 1)}>+</Button>
                    <Button danger size="small" onClick={() => removeFromCart(record.name)}>Remove</Button>
                </Space>
            )
        },
        {
            title: "Subtotal",
            key: "subtotal",
            render: (_, record) => {
                const subtotal = record.price && record.quantity ? record.price * record.quantity : 0;
                return `$${subtotal.toFixed(2)}`;
            }
        },
    ];

    return (
        <div className={styles.container}>
            <Title level={2}>🛒 Your Cart</Title>

            {groupedList.length === 0 ? (
                <Empty description="Your cart is empty." className={styles.emptyCart} />
            ) : (
                <>
                    <Table
                        columns={columns}
                        dataSource={groupedList}
                        rowKey="name"
                        bordered
                        size="middle"
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20],
                        }}
                    />

                    <Divider />

                    <Row justify="end">
                        <Col>
                            <Title level={4}>Total: ${totalPrice.toFixed(2)}</Title>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default Cart;
