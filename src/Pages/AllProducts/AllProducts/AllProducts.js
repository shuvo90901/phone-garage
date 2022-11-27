import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from '../Product/Product';

const AllProducts = () => {
    const products = useLoaderData();
    return (
        <div className='min-h-screen mt-20 mx-8'>
            <div className='lg:grid grid-cols-2 gap-5 '>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default AllProducts;