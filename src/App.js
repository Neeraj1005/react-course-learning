import React, {useState} from "react";
import Alert from "./components/Alert";
// import About from "./components/About";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light')
      document.body.style.backgroundColor = 'white'
      showAlert('Light Mode Enabled','success')
    } else {
      setMode('dark')
      document.body.style.backgroundColor = '#30304c'
      showAlert('Dark Mode Enabled','success')
    }
  }
  return (
    <>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <Form mode={mode} showAlert={showAlert} />
      {/* <About /> */}
    </>
  );
}

export default App;
