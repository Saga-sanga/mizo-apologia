import Nav from './nav.js';
import Footer from './footer.js';

const Layout = ({children}) => {
  return (
    <div>
      <Nav/>
        <div 
          onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
        >
         {children}
        </div>
      <Footer />
    </div>
  )
}

export default Layout;