import styled from "styled-components"
import { theme } from "../../styles/theme"

export const Container = styled.div`
    height: 100dvh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Timer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    color: white;
    font-size: ${({ theme }) => theme.FONTS.xl};

    #value-for-receive {
        font-size: ${({ theme }) => theme.FONTS.sm};
    }
`

export const Controls = styled.div`
    width: 100%;
    max-width: 30rem;

    display: flex;
    justify-content: center;
    gap: 1.4rem;
    padding: 2.4rem;
`
