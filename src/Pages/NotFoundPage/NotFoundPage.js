import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../../src/images/bongo-cat-icegif.gif'

const NotFoundPage = () => {
    return (
        <div className='text-center'>
            <h4 className="text-4xl">OOOOPS!!!</h4>
            <p className="text-2xl">This Page is not Found ...Plaease Go To <Link to='/' className='font-bold'>Home Page</Link></p>
            <img className='mx-auto' src={image} alt="" />
        </div>
    );
};

export default NotFoundPage;