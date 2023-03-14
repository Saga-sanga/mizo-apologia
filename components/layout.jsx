import Nav from './nav';
import Footer from './footer';

const Layout = ({children}) => {
  return (
    <div>
      <Nav/>
        <div 
          onClick={() => {document.querySelector('.modal-container').style.display = 'none'}}
        > 
          {/* Google Tag Manager */}
          <noscript 
            dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TS2GP8F"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}
          />
          {children}
        </div>
      <Footer />
    </div>
  )
}

export default Layout;