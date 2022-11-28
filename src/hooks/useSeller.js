import { useEffect, useState } from "react";

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://phone-garage-server-bay.vercel.app/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setIsSeller(data.isAdmin);
                    setIsSellerLoading(false);
                })
        }
    }, [email])
    return [isSeller, isSellerLoading];
};

export default useSeller;