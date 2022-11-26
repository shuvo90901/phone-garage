import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddProduct = data => {
        console.log(data)
    }

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
                            <input type="text"
                                {...register("category", {
                                    required: 'Product Category is required'
                                })} placeholder="Enter the brand of this product" className="input input-bordered" />
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
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddProduct;