import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('Categorie.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    return (
        <div className='grid grid-cols-3 gap-5 text-center my-36'>
            {
                categories.map(category =>
                    <Link to={`/category/${category.category_id}`} className="card w-96 bg-base-600 shadow-xl">
                        <img src={category.img} alt="Shoes" />
                        <div className="card-body">
                            <h2 className="text-3xl ">{category.category_name}</h2>
                        </div>
                    </Link>)
            }
        </div>
    );
};

export default CategorySection;