import React from "react";
import {
    Layout as AntLayout,
    Menu,
    Dropdown,
    Avatar,
    Badge,
    Typography,
} from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { useCart } from "../cart/hooks/useCart";
import "./Layout.css";

const { Header, Content, Footer } = AntLayout;
const { Title } = Typography;

const Layout = () => {
    const { isAuthenticated, signOut } = useAuth();
    const { cartItems } = useCart();
    const location = useLocation();

    const menuItems = [
        { key: "/", label: <Link to="/">Home</Link> },
        { key: "/products", label: <Link to="/products">Products</Link> },
        { key: "/contact", label: <Link to="/contact">Contact</Link> },
        {
            key: "/cart",
            label: (
                <Link to="/cart">
                    <Badge count={cartItems.length} size="small">
                        <ShoppingCartOutlined style={{ fontSize: "18px", color: "#1710d6" }} />
                    </Badge>{" "}
                    Cart
                </Link>
            ),
        },
    ];

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">My Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={signOut}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <AntLayout className="layout-container">
            <Header className="layout-header">
                <div className="layout-logo">
                    <Title
                        level={4}
                        style={{
                            color: "#f4f4f4",
                            margin: 0,
                            fontWeight: "bold",
                            letterSpacing: "1px",
                        }}
                    >
                        My React App
                    </Title>
                </div>
                {isAuthenticated && (
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        className="layout-menu"
                    />
                )}
                {isAuthenticated && (
                    <Dropdown overlay={userMenu} trigger={["click"]}>
                        <Avatar
                            className="layout-avatar"
                            icon={<UserOutlined />}
                            style={{ marginLeft: 16 }}
                        />
                    </Dropdown>
                )}
            </Header>
            <Content className="layout-content">
                <div className="layout-inner-content">
                    <Outlet />
                </div>
            </Content>
            <Footer className="layout-footer">
                © 2025 My React App. Built with ❤️ using Ant Design.
            </Footer>
        </AntLayout>
    );
};

export default Layout;
