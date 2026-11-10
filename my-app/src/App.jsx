import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Service from './components/Service'
import Custom from './components/Custom'
import Custom1 from './components/Custom1'
import Custom2 from './components/Custom2'
import Custom3 from './components/Custom3'
import Custom4 from './components/Custom4'
import Custom5 from './components/Custom5'
import Custom6 from './components/Custom6'
import Custom7 from './components/Custom7'
import Component8 from './components/Component8'
import Custom8 from './components/Custom8'
import Custom9 from './components/Custom9'
import Component10 from './components/Component10'

function App() {
  const [count, setCount] = useState(0)
  {/* Pass Data From Parent Component App to Child component Service*/} 
  let price=100
  let name='Ashok'
  let phone='788585555'
  const username = "Aarav";
  return (
    <>
      {/* fragments to accept multi values to return */}
      <h1>Hello</h1>
      <p>Welcome to React Js.</p>
      
      {/* सही किया हुआ कंपोनेंट (Capital H के साथ) */}
      <Home /> 
      <About />
      <Service price={price} name={name} phone={phone}/>
      <Contact />
      <Custom/>
      <Custom1/>
      <Custom2/>
      <Custom3 username={username}/>
      <Custom4/>
      <Custom5/>
      <Custom6/>
      <Custom7/>
      <Component8/>
      <Custom8/>
      <Component10/>      
    </>
  )
}
export default App
