import WelcomeMessage from "./components/WelcomeMessage"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"
import Header from "./components/Header"
import UserProfile from "./components/UserProfile"
function App() {


  return (
    <>
      <div>
      
        <Header/>
          <WelcomeMessage/>
        <MainContent/>
        <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography"
      />
        <Footer/>
      </div>
    </>
  )
}

export default App
