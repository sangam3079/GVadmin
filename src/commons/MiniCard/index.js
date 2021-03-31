import React from 'react';
import styled from 'styled-components'
import theme from 'constants/theme'
import {Spin} from 'antd';
 
const MiniCard = ({title, body, icon}) => {
	return(
		<Container className="hover shadow-sm">
			<>{icon}</>
			<Title>{title}</Title>
			<Body>{body || <Spin />}</Body>
		</Container>
	)
}

const Container = styled.div`
	width: 23%;
	background: whitesmoke
	padding: 25px 15px;
	text-align : center
`,
Title = styled.div`
	color: ${theme.color.text.black};
	font-size: 16px;
	font-weight : bold
`,
Body = styled.div`
	color: ${theme.color.text.gray};
	font-size: 48px;
	font-weight: bolder;
`


export default MiniCard;
