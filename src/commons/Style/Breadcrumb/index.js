import React from 'react';
import styled from 'styled-components'
import theme from 'constants/theme'
import Button from 'commons/Buttons'
import { NavLink } from 'react-router-dom'

const Breadcrumb = ({name, createNew, path, title}) => {
	return (
		<>
			{ (name || createNew) &&
				<Container>
					<ActualBreadcrumb>{name}</ActualBreadcrumb>
					{createNew && <RightSettings>
							<CustomButton primary type="submit" disabled={false} style={{ marginRight: 10 }}>
								<Link to={path}>{title}</Link>
							</CustomButton>
						</RightSettings>}
				</Container>
			}
		</>
	)
}

const Container = styled.div`
	display: flex;
	min-width: ${({ fluid }) => fluid ? '100%' : '991px'};
  color: ${theme.color.text.primary};
	margin-top: 20px;
	padding: 10px 0 10px 0;
	margin: 20px 40px;
	justify-content: space-between;
	align-items: baseline;
	`,
	ActualBreadcrumb = styled.div`
		font-size: 30px;
		font-weight: bolder;
		display: block;
		width: 30%;
	`,
	RightSettings = styled.div`
		display: flex;
	`,
	CustomButton = styled(Button.Content)`
    text-transform: uppercase;
		height: 40px;
		margin-right: 0 !important;
	`,
	Link = styled(NavLink)`
    color: #fff
  `

export default Breadcrumb
