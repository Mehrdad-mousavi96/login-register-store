import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { UserContext } from '../useContext'

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard'
  }, [])

  const userContext = useContext(UserContext)

  
  return (
    <div className=''>
      Dashboard
    </div>
  )
}

export default Dashboard