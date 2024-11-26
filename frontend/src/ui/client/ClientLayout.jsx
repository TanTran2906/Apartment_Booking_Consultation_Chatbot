import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
// import { Container } from "react-bootstrap";
import styled from "styled-components";
import Chatbot from "./Chatbot";
// import { useDarkMode } from "../../context/DarkModeContext";
// import { useEffect } from "react";

const Main = styled.main`
    background-color: #fffaf5;
    padding: 4rem 4.8rem 6.4rem;
`;

const StyleApp = styled.div`
    background-color: #fffaf5;
`;

function ClientLayout() {
    // const { isDarkMode, toggleDarkMode } = useDarkMode();

    // useEffect(function(){
    //     if(isDarkMode) toggleDarkMode();
    // },[isDarkMode,toggleDarkMode])

    return (
        <StyleApp>
            <Header />
            <Main>
                <Outlet />
                <Chatbot />
            </Main>
            <Footer />
        </StyleApp>
    );
}

export default ClientLayout;
