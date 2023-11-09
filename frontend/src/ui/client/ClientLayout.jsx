import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
// import { Container } from "react-bootstrap";
import styled from "styled-components";

const Main = styled.main`
    background-color: #fffaf5;
    padding: 4rem 4.8rem 6.4rem;
`;

const StyleApp = styled.div`
    background-color: #fffaf5;
`;

function ClientLayout() {
    return (
        <StyleApp>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </StyleApp>
    );
}

export default ClientLayout;
