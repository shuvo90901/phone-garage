import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [seller, setSeller] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/seller/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setSeller(data)
            })
    }, [user?.email])
    const handleAddProduct = data => {
        const product_name = data.productname;
        const price = data.price;
        const condition = data.condition;
        const number = data.mobile;
        const location = data.location;
        const category_id = data.category;
        const discription = data.discription;
        const purchase_date = data.purchase;
        const image = data.image;
        const date = new Date();
        const seller_name = user?.displayName;
        const seller_email = user?.email;
        const original_price = data.original_price;
        const seller_status = seller?.status;
        const product = {
            product_name, price, condition, number, location, category_id, discription, purchase_date, image, date, seller_name, seller_email, original_price, seller_status
        }

        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('categorie.json')
            const data = await res.json();
            return data;
        }
    })


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card  w-3/4 shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(handleAddProduct)} className="card-body">
                    <div className="md:flex gap-5">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text"
                                {...register("productname", {
                                    required: 'Product Name is required'
                                })} placeholder="Enter Product Name" className="input input-bordered" />
                            {errors.productname && <p>{errors.productname?.message}</p>}
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text"
                                {...register("price", {
                                    required: 'Price is required'
                                })} placeholder="Enter Product Price" className="input input-bordered" />
                            {errors.price && <p>{errors.price?.message}</p>}
                        </div>
                    </div>
                    <div className="md:flex gap-5">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Condition Type</span>
                            </label>
                            <input type="text"
                                {...register("condition", {
                                    required: 'Condition Type is required'
                                })} placeholder="Enter Type Excellent/Good/Fair" className="input input-bordered" />
                            {errors.condition && <p>{errors.condition?.message}</p>}
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Mobile Number</span>
                            </label>
                            <input type="text"
                                {...register("mobile", {
                                    required: 'Mobile Number is required'
                                })} placeholder="Enter Mobile Number" className="input input-bordered" />
                            {errors.mobile && <p>{errors.mobile?.message}</p>}
                        </div>
                    </div>
                    <div className="md:flex gap-5">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text"
                                {...register("location", {
                                    required: 'Location is required'
                                })} placeholder="Enter Location" className="input input-bordered" />
                            {errors.location && <p>{errors.location?.message}</p>}
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Category</span>
                            </label>
                            <select
                                {...register("category", {
                                    required: 'Product Category is required'
                                })}
                                className="select input-bordered w-full ">
                                {
                                    categories.map(category =>
                                        <option
                                            key={category.category_id}
                                            value={category.category_id}
                                        >{category.category_name}</option>
                                    )
                                }
                            </select>
                            {errors.category && <p>{errors.category?.message}</p>}
                        </div>
                    </div>
                    <div className="md:flex gap-5">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Discription</span>
                            </label>
                            <input type="text"

                                {...register("discription", {
                                    required: 'Discription is required'
                                })} placeholder="Enter the product Description" className="input input-bordered" />
                            {errors.discription && <p>{errors.discription?.message}</p>}
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Year of Purchase</span>
                            </label>
                            <input type="text"
                                {...register("purchase", {
                                    required: 'Purchase date is required'
                                })} placeholder="Enter Which that of Purchase" className="input input-bordered" />
                            {errors.discription && <p>{errors.discription?.message}</p>}
                        </div>
                    </div>
                    <div className="md:flex gap-5">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input type="text"
                                {...register("image", {
                                    required: 'Image is required'
                                })} placeholder="Enter the product image" className="input input-bordered" />
                            {errors.image && <p>{errors.image?.message}</p>}
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input type="text"
                                {...register("original_price", {
                                    required: 'Original is required'
                                })} placeholder="Enter the Original Price" className="input input-bordered" />
                            {errors.original_price && <p>{errors.original_price?.message}</p>}
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddProduct;