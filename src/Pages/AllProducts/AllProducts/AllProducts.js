import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AllProducts = () => {
    const products = useLoaderData();
    console.log(products)
    return (
        <div>

        </div>
    );
};

export default AllProducts;