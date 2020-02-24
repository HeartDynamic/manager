import React from 'react'
import styled from 'styled-components'
const MyButton = styled.button`
    box-sizing: border-box;
    display: block;
    width: ${props => `${(props.styledOptions && props.styledOptions.width) || ''}`};
    height: ${props => `${(props.styledOptions && props.styledOptions.height) || '28px'}`};
    line-height: ${props => `${(props.styledOptions && props.styledOptions.lHeight) || '26px'}`};
    text-align: center;
    border: 1px solid ${props => `${(props.styledOptions && props.styledOptions.borderColor) || '#fff'}`};
    border-radius: ${props => `${(props.styledOptions && props.styledOptions.radius) || '8px'}`};
    font-size: ${props => `${(props.styledOptions && props.styledOptions.size) || '12px'}`};
    font-family: ${props => `${(props.styledOptions && props.styledOptions.faily) || 'PingFang-SC-Medium'}`};
    font-weight: ${props => `${(props.styledOptions && props.styledOptions.weight) || '500'}`};
    color: ${props => `${(props.styledOptions && props.styledOptions.color) || '#fff'}`};
    background-color: ${props => `${(props.styledOptions && props.styledOptions.bgColor) || '#fff'}`};
    padding: 0px 16px;
    outline: none;
    box-shadow: ${props =>
        `${(props.styledOptions && props.styledOptions.shadow) || '-1px 6px 16px 0px rgba(0,91,167,0.1)'}`};
    cursor: ${props => `${(props.styledOptions && props.styledOptions.cursor) || 'pointer'}`};
    &:hover {
        background-color: ${props => `${(props.styledOptions && props.styledOptions.HbgColor) || '#fff'}`};
        border: 1px solid ${props => `${(props.styledOptions && props.styledOptions.HborderColor) || '#fff'}`};
        color: ${props => `${(props.styledOptions && props.styledOptions.HColor) || '#fff'}`};
    }
`
const MySpan = styled.span``
function Button(props) {
    return (
        <MyButton type='button' onClick={props.onClick} styledOptions={props.styledOptions}>
            <MySpan>{props.children}</MySpan>
        </MyButton>
    )
}
export default Button
