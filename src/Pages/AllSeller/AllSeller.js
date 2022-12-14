import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../utilities/Loading';
import Table from './Table';

const AllSeller = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email);

    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://phone-garage-server-bay.vercel.app/seller')
            const data = await res.json();
            return data;
        }
    })

    const handleMakeVerify = id => {
        fetch(`https://phone-garage-server-bay.vercel.app/seller/verify/${id}`, {
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

    const handleDeleteSeller = seller => {
        fetch(`https://phone-garage-server-bay.vercel.app/users/${seller._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Seller ${seller.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
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
                            <th>Remove Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr>
                                <th>{i + 1}</th>
                                <td className='flex items-center gap-3'>{seller.name}{
                                    seller.status &&
                                    <FaCheck className='text-blue-600' />
                                }</td>
                                <td>{seller.email}</td>
                                <td>{
                                    seller?.status === 'verified' ?
                                        <button
                                            className="btn btn-primary btn-sm" disabled>Verified</button>
                                        :
                                        <button onClick={() => handleMakeVerify(seller._id)} className="btn btn-success btn-sm">Verify</button>
                                }</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteSeller(seller)}
                                        className="btn btn-warning btn-sm">Delete</button>
                                </td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;