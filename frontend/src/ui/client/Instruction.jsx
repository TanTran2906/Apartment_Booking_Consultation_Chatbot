import styled from "styled-components";
import Heading from "../Heading";
import { Description } from "../../pages/client/CabinDetail";
import Amenities from "./Amenities";

const Question = styled.div`
    position: relative;
    min-height: 175px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: var(--natural-color-02, #fff);
    padding: 20px 40px;
`;

const LongLine = styled.div`
    width: 960px;
    height: 1px;
    background: #d9d9d9;
`;

function Instruction() {
    return (
        <>
            <Heading as="h1">Special check-in instructions</Heading>
            <Description>
                When checking in at the hotel, go through a simple and
                convenient process. First, after booking through the website
                application, you will go to the reception desk to perform the
                check-in process. This is when you confirm the booking
                information, accept the hotel's terms and make payment if it has
                not been paid in advance. Once completed, you will receive a key
                or magnetic card to open the room door.
                <br />
                <br />
                Friendly staff will provide important information such as wifi
                passwords and location of services within the hotel. If you have
                any requests or questions, don't hesitate to ask the staff.
                After going through this process, you will be ready to start
                your journey to rest at the hotel, enjoying the comfortable
                space and amenities for tourists.
            </Description>
            <LongLine />

            <Heading as="h1">Amenities</Heading>
            <Amenities />

            <Question>
                <Heading as="h2">
                    Do you pay before or after booking a hotel?
                </Heading>

                <Description>
                    You can pay in advance or upon check-in.
                </Description>
            </Question>

            <Question>
                <Heading as="h2">
                    What documents are needed for hotel booking?
                </Heading>

                <Description>
                    When you prepare to book a hotel room, you need to prepare
                    some important documents. First, you will need to provide
                    personal information such as your full name and contact
                    information. At the same time, payment information such as
                    credit card information or other payment method is also
                    important.
                    <br />
                    <br />
                    Also, remember to bring your ID card or passport, especially
                    when you check in. You will also need to provide booking
                    information, including number of guests, length of stay, and
                    any special requests.
                </Description>
            </Question>
        </>
    );
}

export default Instruction;
