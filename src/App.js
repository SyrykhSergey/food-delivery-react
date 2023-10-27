import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Content, Header} from "antd/es/layout/layout";
import {Layout} from "antd";
import Registration from "./pages/Registration";
import Menu from "./pages/Menu"
import Authorization from "./pages/Authorization";
import HeaderMenu from "./components/HeaderMenu";

function App() {
    return (
        <Router>
            <Layout>
                <Header style={{background:"white", borderBottom: "solid 1px black", padding:"0", width: "100%"}}>
                    <HeaderMenu />
                </Header>
                <Content>
                    <Routes>
                        <Route path='/' element={<Menu />} />
                        <Route path='/registration' element={<Registration />} />
                        <Route path='/authorization' element={<Authorization />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
  );
}

export default App;
