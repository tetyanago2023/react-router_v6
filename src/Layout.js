import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout = ({ search, setSearch }) => {
    return (
        <div className="App">
            <Header title="Tetyana's React Router v.6 Blog"/>
            <Nav search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;