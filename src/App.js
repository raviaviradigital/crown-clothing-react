import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.route.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/auth/auth.component";
function App() {
  const Shop = () => {
    return <h1>Shop page</h1>;
  };
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
