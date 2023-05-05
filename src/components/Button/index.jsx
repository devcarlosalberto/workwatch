import { Container } from "./styles"
import { theme } from "../../styles/theme"

export function Button({ title, icon: Icon, fontSize = "md", ...rest }) {
    return (
        <Container {...rest} fontSize={theme.FONTS[fontSize]}>
            {Icon && <Icon />}
            {title}
        </Container>
    )
}
