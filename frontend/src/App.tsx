

import { useContext, useEffect } from 'react'
import { Container, Navbar,Nav} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Store } from './Store'

function App() {
 //use state:{mode} to get mode from state 
  const {state:{mode},dispatch}= useContext(Store)

  useEffect(()=> {
    document.body.setAttribute('data-bs-theme',mode)
  },[mode])//dependency array have mode when there is change in mode change theme
  
  return (
   <div className='d-flex flex-column vh-100'>
    <header>
      <Navbar bg='dark' variant='dark' expand = 'lg'>
        <Container>
          <Navbar.Brand>AMAZONA</Navbar.Brand>
        </Container>
       <Nav>
          {/* <a href="./cart" className='nav-link'>
          Cart</a>
          <a href="./signin" className='nav-link'>
          SignIn</a> */}
        </Nav>
      </Navbar>
    </header>
    <main><Container className='mt-3'>
      <Outlet></Outlet>
   </Container></main>
    <footer><div className='text-center'>All right reserved</div></footer>
   </div>
  )
}

export default App
