import React from 'react'
import styled from 'styled-components'

const Container = styled.header`
    display: flex;
    background-color: #fafafa;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
    text-align: center;
`
const Item = styled.div`
    width: ${props => (props.setWidth ? props.setWidth + 'px' : '100%')};
    padding: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-feature-settings: 'tnum';
    font-weight: 500;
    font-size: 14px;
`

function Header(props) {
    return (
        <Container>
            {props.column.map((v, i) => (
                <Item key={i} setWidth={v.props.width}>
                    {v.props.title}
                </Item>
            ))}
        </Container>
    )
}

export default Header
