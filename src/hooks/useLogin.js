import React, { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)
        try {
          const res =  await projectAuth.signInWithEmailAndPassword(email, password)

            //dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})

            setError(null)
            setIsPending(false)

            // if(!isCancelled) {
            //     setError(null)
            //     setIsPending(false)
            // }

        }
        catch (err) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)

        }
        // catch (err) {
        //     if(!isCancelled) {
        //         console.log(err.message)
        //         setError(err.message)
        //         setIsPending(false)
        //     }

        // }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
  return {login, error, isPending}
}
