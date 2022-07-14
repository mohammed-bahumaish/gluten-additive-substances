import Header from './Header'

const Layout = ({ children }: { children: any }) => (
  <>
    <Header />
    {children}
  </>
)

export default Layout
