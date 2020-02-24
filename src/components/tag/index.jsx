import React from 'react'
import styled from 'styled-components'

const MyTag = styled.span`
    display: inline-block;
    height: ${props => (props.styleOption && props.styleOption.height) || '28px'};
    line-height: ${props => (props.styleOption && props.styleOption.height) || '28px'};
    color: ${props => (props.styleOption && props.styleOption.color) || '#20666a'};
    font-size: ${props => (props.styleOption && props.styleOption.size) || '12px'};
    font-family: ${props => (props.styleOption && props.styleOption.family) || 'Adobe Heiti Std R'};
    font-weight: ${props => (props.styleOption && props.styleOption.weight) || 'normal'};
    padding: 0 8px;
    background-color: ${props => (props.styleOption && props.styleOption.bgColor) || '#fff'};
    border: 1px solid ${props => (props.styleOption && props.styleOption.borderColor) || '#58d8e0'};
    border-radius: ${props => (props.styleOption && props.styleOption.radius) || '8px'};
    cursor: ${props => (props.styleOption && props.styleOption.cursor) || 'auto'};
`

function Tag(props) {
    return <MyTag styleOption={props.styleOption}>{props.children}</MyTag>
}

export default Tag
