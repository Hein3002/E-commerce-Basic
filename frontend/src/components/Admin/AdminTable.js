import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import qs from 'qs';
import SummaryApi from '../../common';

const columns = [
    {
        title: 'Image',
        dataIndex: 'productImage',
        render: (productImage) => (<img src={productImage?.[0]} alt="Product" style={{ width: '50px', height: '50px' }} />),
    },
    {
        title: 'Name',
        dataIndex: 'productName',
    },
    {
        title: 'Band',
        dataIndex: 'brandName',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
];
const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});
const TableProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const fetchData = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
    };
    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        
            <Table
                columns={columns}
                rowKey={(data) => data._id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
       

    );
};
export default TableProduct;