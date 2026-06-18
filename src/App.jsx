import Manager from "./Component/Manger"
import Navbar from "./Component/NavBar"
import Footer from "./Component/Footer"
function App() {

  return (
    <>
  <Navbar />
  <div className='min-h-[80vh]'>
    <Manager/>
    </div>

    <Footer />
    </>
  )
}

export default App
