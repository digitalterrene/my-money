import React, { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            //signup user
            //we use const because it will send a response
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            //add display name to user
            await res.user.updateProfile({ displayName })


            //dispatch login action
            
            dispatch({ type: 'LOGIN', payload: res.user})

            setError(null)
            setIsPending(false)

        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}
