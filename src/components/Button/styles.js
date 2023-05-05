import styled from "styled-components"

export const Container = styled.button`
    width: 100%;
    padding: 1.2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.COLORS.fontColor};
    font-size: ${({ fontSize }) => fontSize};

    border: none;
    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.COLORS.backgroundInput};

    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.backgroundInputHover};
    }
`
