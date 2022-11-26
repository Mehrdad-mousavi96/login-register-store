import React from 'react'
import { useEffect } from 'react'

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard'
  }, [])
  return (
    <div className=''>Dashboard</div>
  )
}

export default Dashboard