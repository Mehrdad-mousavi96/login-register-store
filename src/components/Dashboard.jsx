import React from 'react'
import { useEffect } from 'react'

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard'
  }, [])
  return (
    <div className='dark:bg-zinc-900 light:bg-red-200'>Dashboard</div>
  )
}

export default Dashboard