import { useEffect, useState } from 'react'
import useSWR from 'swr'
const LastSalesPage = () => {
    // by the time rm for useSWR
    const [sales, setSales ] = useState();
    // const [isLoading, setIsLoading] = useState(false);
    // useEffect( () => {
    //     setIsLoading(true)
    //     fetch( 'https://nextcgfiveintossgssrcsr-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json' )
    //     .then( resp => resp.json())
    //     .then( data => {
    //         const tranf = [];
    //         for (const key in data) {
    //             tranf.push({id: key, username: data[key].username, volume: data[key].volume})
    //         }
    //         setSales(tranf);
    //         setIsLoading(false);
    //     })
    // }, [])
    const {data, error } = useSWR('https://nextcgfiveintossgssrcsr-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json');
    useEffect( () => {
        if (data) {
            const tranf = [];
            for (const key in data) {
                tranf.push({id: key, username: data[key].username, volume: data[key].volume})
            }
            setSales(tranf);
            setIsLoading(false);
        }
    }, [data])
    if (error) {
        return <p> No data yet </p>
    }
    if (!data || !sales) {
        return <p> Loading ...</p>
    }
    return (
        <ul>
            {sales.map(sale => <li key={sale.id}> {sale.username} - ${sale.volume} </li>)}
        </ul>
    )
}

export default LastSalesPage