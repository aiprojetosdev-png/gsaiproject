import Sidebar from './Sidebar'
import Header from './Header'
import ToastContainer from './Toast'

export default function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-gs-bg">
      <Sidebar onLogout={onLogout} />
      <Header user={user} />
      <main className="ml-60 pt-14 min-h-screen">
        <div className="p-7 animate-fade-in">
          {children}
        </div>
      </main>
      <ToastContainer />
    </div>
  )
}
