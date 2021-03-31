import styled from 'styled-components'
import theme from 'constants/theme'
import Row from 'commons/Forms/Row'

export const ForgotPassword = styled.div`
    && {
      > a {
        font-size: 16px;
        color: ${theme.color.button.primary};
      }
    }
  `,
  ForgotDiv = styled(Row)`
    justify-content: space-between;
  `,
  ResendDiv = styled.span`
    cursor: pointer;
    text-decoration: underline;
  `
