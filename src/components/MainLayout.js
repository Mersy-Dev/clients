import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser, AiOutlineBgColors, AiOutlinePicLeft, AiOutlinePicRight, } from 'react-icons/ai';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaClipboardList, FaBloggerB } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {IoIosNotifications} from 'react-icons/io';
import { Layout, Menu, Button, theme } from 'antd';
import {Outlet} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu; // Import SubMenu from Ant Design

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'nothing', // Empty key
      icon: null, // No icon for the empty option
      label: '', // Empty label
    },
    {
      key: '',
      icon: <AiOutlineDashboard className='fs-4' />,
      label: 'Dashboard',
    },
    {
      key: 'customers',
      icon: <AiOutlineUser className='fs-4' />,
      label: 'Customers',
    },
    {
      key: 'catalog',
      icon: <AiOutlineShoppingCart className='fs-4' />,
      label: 'Catalog',
      children: [
        {
          key: 'product',
          icon: <AiOutlineShoppingCart className='fs-5' />,
          label: 'Add Product',
        },
        {
          key: 'product-list',
          icon: <AiOutlineShoppingCart className='fs-5' />,
          label: 'Product List',
        },
        {
          key: 'brand',
          icon: <SiBrandfolder className='fs-5' />,
          label: 'Brands',
        },
        {
          key: 'brand-list',
          icon: <SiBrandfolder className='fs-5' />,
          label: 'Brands List ',
        },
        {
          key: 'category',
          icon: <BiCategoryAlt className='fs-5' />,
          label: 'Category',
        },
        {
          key: 'category-list',
          icon: <BiCategoryAlt className='fs-5' />,
          label: 'Category List',
        },
        {
          key: 'color',
          icon: <AiOutlineBgColors className='fs-5' />,
          label: 'Color',
        },
        {
          key: 'color-list',
          icon: <AiOutlineBgColors className='fs-5' />,
          label: 'Color List',
        },
      ],
    },
    {
      key: 'orders',
      icon: <FaClipboardList className='fs-5' />,
      label: 'Orders',
    },
    {
      key: 'blog',
      icon: <FaBloggerB className='fs-5' />,
      label: 'Blogs',
      children: [
        {
          key: 'add-blog',
          icon: <ImBlog className='fs-5' />,
          label: 'Add Blog',
        },
        {
          key: 'blog-list',
          icon: <ImBlog className='fs-5' />,
          label: 'Blog List',
        },
        {
          key: 'blog-category',
          icon: <FaBloggerB className='fs-5' />,
          label: 'Add Blog Category',
        },
        {
          key: 'blog-category-list',
          icon: <FaBloggerB className='fs-5' />,
          label: 'Blog Category List',
        },
      ],
    },
    {
      key: 'enquiries',
      icon: <FaClipboardList className='fs-5' />,
      label: 'Enquiries',
    },
    {
      key: 'signout',
      icon: null,
      label: 'Sign Out',
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"> 
          <h2 className=' text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>MC</span>
            <span className='lg-logo'>Mercy Code</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          onClick={({ key }) => {
            if (key === 'signout') {
              // Handle signout
            } else {
              navigate(key);
            }
          }}
        >
          {menuItems.map((item) => {
            if (item.children) {
              return (
                <SubMenu
                  key={item.key}
                  title={item.label}
                  icon={item.icon}
                >
                  {item.children.map((child) => (
                    <Menu.Item key={child.key} icon={child.icon}>
                      {child.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
        className='site-layout-background d-flex justify-content-between align-items-center ps-2 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className=' d-flex gap-4 align-items-center'>
            <div className=' position-relative'>
              <IoIosNotifications className='' style={{fontSize:"25px"}} />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center dropdown' >
              <div>
                <img style={{width:"45px", borderRadius:"50%", height:"45px"}} src="https://i.pinimg.com/474x/39/e3/96/39e396c5b5ad2ee1546cba3c8d771b12.jpg" alt="" />
              </div>
              <div
                role='button' id='dropdownMenuLink' data-bs-toggle='dropdown' aria-expanded='false' 
              >
                <h5 className='mb-0'>Mercy</h5>
                <p className='mb-0'>mercyjunior24@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby='dropdownMenuLink'>
                <li className=''><Link className='dropdown-item py-1 mb-1' style={{height:"auto", lineHeight:"20px"}} to="#">View Profile</Link></li>
                <li className=''><Link className='dropdown-item py-1 mb-1' style={{height:"auto", lineHeight:"20px"}} to="#">Sign Out</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer 
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme= 'colored'
           />
            <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
