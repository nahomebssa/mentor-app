import styled from 'styled-components'

export const FlexBox = styled.div`
	display: flex;
	flex-direction: ${props => props.flexDirection || 'row'};
	flex-wrap: ${props => props.flexWrap || 'nowrap'};
	justify-content: ${props => props.justifyContent || 'flex-start'};
	align-items: ${props => props.alignItems || 'stretch'};
	align-content: ${props => props.alignContent || 'stretch'};

`
export const FlexItem = styled.div`
	order: ${props => props.order || 0};
	flex-grow: ${props => props.flexGrow || 0};
	flex-shrink: ${props => props.flexShrink || 1};
	flex-basis: ${props => props.flexBasis || 'auto'};
	flex: ${props => props.flex || '0 1 auto'};
	align-self: ${props => props.alignSelf || 'auto'};
`