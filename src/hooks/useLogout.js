import React, { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const logout = async () => {
        setError(null)
        setIsPending(true)
        try {
            await projectAuth.signOut()

            //dispatch lout action
            dispatch({type: 'LOGOUT'})

            if(!isCancelled) {
                setError(null)
                setIsPending(false)
            }

        }
        catch (err) {
            if(!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }

        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
  return {logout, error, isPending}
}
