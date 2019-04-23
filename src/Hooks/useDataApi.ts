import { useState, useEffect } from 'react'

export const useDataApi = () => {
  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isError, setIsError ] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
        
      try {
        const res = await fetch('https://scout-backend.herokuapp.com/api')
        const json = await res.json()
  
        setData(json)
      } catch (err) {
        setIsError(true)
        console.log(err)
      }
  
      setIsLoading(false)
    }
  
    fetchData()
  }, [])
  
  return { data, isLoading, isError }
}