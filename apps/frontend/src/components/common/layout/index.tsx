import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: { children: any }) => (
  <div className="min-h-screen flex flex-col justify-between">
    <Header />
    <div className=" flex-auto">{children}</div>
    <Footer />
  </div>
)

export default Layout
