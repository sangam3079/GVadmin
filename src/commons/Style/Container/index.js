import styled from 'styled-components'
import theme from 'constants/theme'

export default styled.div `
min-width: ${({ fluid }) => fluid ? '100%' : '991px'};
  color: ${theme.color.text.primary};
`
