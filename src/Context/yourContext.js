import { useState,createContext,useContext } from "react";
import ReactDOM from "react-dom/client";


const UserContext=createContext();
export default function YouComponent() {
  const [user, setUser] = useState("Vinay");

  return (
    <>
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
      </UserContext.Provider>
    </>
  );
}

function Component2({ user }) {
  return (
    <>
      <h1>Component 2</h1>
      <Component3/>
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h1>Component 4</h1>
      <Component5/>
    </>
  );
}

function Component5() {
    const user=useContext(UserContext);
  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<YouComponent/>);