import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Content, Header} from "antd/es/layout/layout";
import {Layout} from "antd";
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";
import HeaderMenu from "./components/HeaderMenu";

function App() {
    return (
        <Router>
            <Layout>
                <Header style={{background:"white", borderBottom: "solid 1px black", padding: "0 10px 0 10px", width: "100vw"}}>
                    <HeaderMenu />
                </Header>
                <Content>
                    <Routes>
                        <Route path='/registration' element={<Registration />} />
                        <Route path='/authorization' element={<Authorization />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
  );
}

export default App;
