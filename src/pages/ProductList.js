import React, { useEffect } from 'react';
import { Table } from "antd";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'sNo',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.length - b.title.length,

  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },

  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
  }
,
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: 'Actions',
    dataIndex: 'action',
    key: 'action',

  }
];


const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  const productstate = useSelector(state => state.product.products);
  const datas = [];
  for (let i = 0; i < productstate.length; i++) {
    datas.push({
      key: i + 1,
      title: productstate[i].title,
      description: productstate[i].description,
      brand: productstate[i].brand,
      category: productstate[i].category,
      tags: productstate[i].tags,
      color: productstate[i].color,
      price: `$ ${productstate[i].price}`,
      action: (
        <>  
          <Link to="/"><BiEdit className='text-primary ms-2 me-2 fs-5' /></Link> 
           <Link> <AiFillDelete className='text-danger fs-5' /> </Link>
        </>
      )

    });
  }
  return (
    <div>
      <h3 className='mb-4 title'> Product List</h3>
      <div>
        <Table columns={columns} dataSource={datas} />
      </div>
    </div>
  )
}

export default ProductList