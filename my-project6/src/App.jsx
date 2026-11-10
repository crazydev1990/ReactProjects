import React from 'react'
import './App.css'
import SalesChart from '../src/components/chart'
import ProductChart from '../src/components/ProductChart'
import ProductSearch from '../src/components/ProductSearch'
import Concurrent from '../src/components/Concurrent'

function App() {
  return (
    <>
      <SalesChart />
      <ProductChart />
      <ProductSearch />
      <Concurrent />
    </>
  )
}

export default App;
