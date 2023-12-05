import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import {
    RiLoginBoxLine,
    RiInformationLine,
    RiCheckboxCircleLine,
} from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";

const StyledNav = styled(Nav)`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const StyledNavItem = styled(Nav.Item)`
    flex: 1;
    text-align: center;
`;

const StyledNavLink = styled(Nav.Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 15px;
    text-decoration: none;
    color: #333;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.3s ease;

    svg {
        margin-right: 8px;
    }

    &:hover {
        color: #fff;
        background-color: #333;
        border-color: #333;
    }

    &.completed {
        color: #fff;
        background-color: #333;
        border-color: #333;
        border-radius: 999px;
        max-width: 390px;
    }

    &.disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;

const CheckoutSteps = ({ step1, step2, step3, step4,currentStep  }) => {
    return (
        <StyledNav>
            <StyledNavItem>
                {step1 ? (
                    <LinkContainer to="/login">
                        <StyledNavLink className={currentStep >= 1 ? "completed" : "disabled"}>
                            <RiLoginBoxLine /> Sign In
                        </StyledNavLink>
                    </LinkContainer>
                ) : (
                    <StyledNavLink disabled>
                        <RiLoginBoxLine /> Sign In
                    </StyledNavLink>
                )}
            </StyledNavItem>

            <StyledNavItem>
                {step2 ? (
                    <LinkContainer to="/bookingInfo">
                        <StyledNavLink className={currentStep >= 2 ? "completed" : "disabled"}>
                            <RiInformationLine /> Booking Info
                        </StyledNavLink>
                    </LinkContainer>
                ) : (
                    <StyledNavLink disabled>
                        <RiInformationLine /> Booking Info
                    </StyledNavLink>
                )}
            </StyledNavItem>

            <StyledNavItem>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <StyledNavLink className={currentStep >= 3 ? "completed" : "disabled"}>
                            <FaRegCreditCard /> Payment
                        </StyledNavLink>
                    </LinkContainer>
                ) : (
                    <StyledNavLink disabled>
                        <FaRegCreditCard /> Payment
                    </StyledNavLink>
                )}
            </StyledNavItem>

            <StyledNavItem>
                {step4 ? (
                    <LinkContainer to="/booking">
                        <StyledNavLink className={currentStep >= 4 ? "completed" : "disabled"}>
                            <RiCheckboxCircleLine /> Booking
                        </StyledNavLink>
                    </LinkContainer>
                ) : (
                    <StyledNavLink disabled>
                        <RiCheckboxCircleLine /> Booking
                    </StyledNavLink>
                )}
            </StyledNavItem>
        </StyledNav>
    );
};

export default CheckoutSteps;
