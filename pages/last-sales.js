import { useEffect, useState } from 'react'
import useSWR from 'swr'
const LastSalesPage = (props) => {
    // by the time rm for useSWR
    const [sales, setSales ] = useState(props.sales);
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
    if (!data && !sales) {
        return <p> Loading ...</p>
    }
    // by the time rm bcoz updated
    // if (!data || !sales) {
    //     return <p> Loading ...</p>
    // }
    return (
        <ul>
            {sales.map(sale => <li key={sale.id}> {sale.username} - ${sale.volume} </li>)}
        </ul>
    )
}
export async function getStaticProps() {
    return fetch( 'https://nextcgfiveintossgssrcsr-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json' )
    .then( resp => resp.json())
    .then( data => {
        const tranf = [];
        for (const key in data) {
            tranf.push({id: key, username: data[key].username, volume: data[key].volume})
        }
        return { props: { sales: tranf}, revalidate: 10 }
    })
    // below is the same code but different structure and more recognizable code from previous.
    // const resp = await fetch( 'https://nextcgfiveintossgssrcsr-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json' )
    // const data = await resp.json()
    // const tranf = [];
    // for (const key in data) {
    //     tranf.push({id: key, username: data[key].username, volume: data[key].volume})
    // }
    // return { props: { sales: tranf}, revalidate: 10 }

}

export default LastSalesPage