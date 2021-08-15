import Nav from './nav.js';
import Footer from './footer.js';

const Layout = ({children}) => {
  return (
    <div>
      <Nav/>
      {children}
      <Footer />
    </div>
  )
}

export default Layout;