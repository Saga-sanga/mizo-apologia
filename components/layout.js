import Nav from './nav.js';

const Layout = ({children}) => {
  return (
    <div>
      <Nav/>
      {children}
    </div>
  )
}

export default Layout;