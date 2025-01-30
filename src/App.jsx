import { useState } from "react";
import "./App.css";
import Manager from "./components/Manager";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="inset-0 -z-10 min-h-screen w-full items-center px-5 py-6 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <Manager />
      </div>
    </>
  );
}

export default App;
