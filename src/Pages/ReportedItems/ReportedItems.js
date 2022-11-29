import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const ReportedItems = () => {
    const { data: reportedItem = [], refetch } = useQuery({
        queryKey: ['reportedItem'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reported');
            const data = await res.json();
            return data;
        }
    })
    console.log(reportedItem)

    const handleDeleteReport = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`
                    Item deleted successfully`)
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
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Reporter Email</th>
                            <th>Remove Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItem.map((reported, i) => <tr>
                                <th>{i + 1}</th>
                                <td>
                                    <img className='w-12' src={reported?.image} alt="" />
                                </td>
                                <td>{reported?.product_name}</td>
                                <td>{reported.price}</td>
                                <td>{reported?.reporter_email}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteReport(reported._id)}
                                        className="btn btn-warning btn-sm">Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItems;