import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import Table from './Table';

const AllSeller = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/seller')
            const data = await res.json();
            return data;
        }
    })

    const handleMakeVerify = id => {
        fetch(`http://localhost:5000/seller/verify/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller Verify Successfully');
                    refetch();
                }
            })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Seller Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{
                                    seller?.status === 'verified' ?
                                        <button
                                            className="btn btn-primary btn-sm" disabled>Verified</button>
                                        :
                                        <button onClick={() => handleMakeVerify(seller._id)} className="btn btn-warning btn-sm">Verify</button>
                                }</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            );
        </div>
    );
};

export default AllSeller;