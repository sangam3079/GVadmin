import styled from 'styled-components'
import theme from 'constants/theme'

export default styled.div`
/*min-width: ${({ fluid }) => fluid ? '100%' : '991px'};*/
  color: ${theme.color.text.primary};
	margin-top: 20px;
	background: whitesmoke;
	padding: 30px 20px;
	margin: 0px 0px;
	border-radius : 7px;
	box-shadow : 0 .5rem 1rem rgba(0,0,0,.15)!important;
`
