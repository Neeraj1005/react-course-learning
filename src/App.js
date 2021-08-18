import React, {useState} from "react";
// import About from "./components/About";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState('light')
  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light')
      document.body.style.backgroundColor = 'white'
    } else {
      setMode('dark')
      document.body.style.backgroundColor = '#30304c'
    }
  }
  return (
    <>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <Form mode={mode} />
      {/* <About /> */}
    </>
  );
}

export default App;
