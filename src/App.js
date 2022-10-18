import React, {useState} from "react";
import Counter from "./Counter";
import CounterHooks from "./CounterHooks";

export const ThemeContext = React.createContext()

function App() {
  const [theme, setTheme] = useState('red')
  return (
    <ThemeContext.Provider value={{backgroundColor: theme}} >
      Counter
      <Counter initialCounter={0}/>
      CounterHooks
      <CounterHooks initialCounter={0}/>
      <button onClick={() => setTheme(prevTheme => {
        return prevTheme === 'red' ? 'green' : 'red'
      })}>Toggle Theme</button>
    </ ThemeContext.Provider>
  )
}

export default App;
