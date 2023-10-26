import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Content, Header} from "antd/es/layout/layout";
import {Layout} from "antd";
import Registration from "./pages/Registration";

function App() {
    return (
        <Router>
            <Layout>
                <Header style={{background:"white", borderBottom: "solid 1px black", height: "5vh"}}>
                </Header>
                <Content>
                    <Routes>
                        <Route path='/registration' element={<Registration />}/>
                    </Routes>
                </Content>
            </Layout>
        </Router>
  );
}

export default App;
