import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const { addDocument, response } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name,
            amount
        })

    }

    useEffect(() => {
        if(response.success) {
            setName('')
            setAmount('')
            console.log('added successfully')
        }
    }, [response.success])

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        value={name}
                        required
                        type='text'
                        onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        value={amount}
                        required
                        type='number'
                        onChange={(e) => setAmount(e.target.value)} />
                </label>
                <button>Add transaction</button>
            </form>
        </>
    )
}
