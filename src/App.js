import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.route.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/signin/signin.component";
function App() {
  const Shop = () => {
    return <h1>Shop page</h1>;
  };
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
