import styled from "styled-components";
import SidebarTools from "../../ui/client/SidebarTools";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ServiceList from "../../ui/client/ServiceList";

const StyledContainer = styled.div`
    width: 1170px;
    max-width: calc(100% - 200px);
    margin: 0 auto;
    display: flex;
    gap: 30px;
`;

function ServicesToDisplay() {
    //Lift state
    const [search, setSearch] = useState("");
    async function fetchServiceSearchByName(name) {
        if (search.length === 0) {
            const response = await fetch(`/api/services`);
            const data = await response.json();
            return data;
        } else {
            const response = await fetch(`/api/services/search/${name}`);
            const data = await response.json();
            return data;
        }
    }

    const { data } = useQuery({
        queryKey: ["Services", search],
        queryFn: () => fetchServiceSearchByName(search),
    });

    return (
        <>
            <StyledContainer>
                <SidebarTools search={search} setSearch={setSearch} />
                <ServiceList dataForSearch={data} />
            </StyledContainer>
        </>
    );
}

export default ServicesToDisplay;
