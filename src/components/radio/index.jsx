import React from 'react'
import styled from 'styled-components'

const MyInput = styled.input`
    display: none;
    :checked + label::after {
        background-color: #1890ff;
    }
    &:checked + label i {
        display: flex;
        border: 1px solid #1890ff;
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
`
const MyLabel = styled.label`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 16px;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    &:after {
        box-sizing: border-box;
        transition: all 0.5s ease;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        content: '';
    }
`
const MyLabel1 = styled.label`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &:after {
        box-sizing: border-box;
        transition: all 0.5s ease;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        left: 6px;
        content: '';
    }
`
const MyI = styled.i`
    display: flex;
    border: 1px solid #d9d9d9;
    width: 20px;
    height: 20px;
    border-radius: 50%;
`
const MySpan = styled.span`
    padding: 0 8px;
`

function Radio(props) {
    return (
        <MyLabel disabled={props.disabled}>
            <MyInput
                id={props.name}
                type='radio'
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                defaultChecked={props.value === props.defaultValue ? true : false}
                disabled={props.disabled}
            />
            <MyLabel1 forName={props.name}>
                <MyI />
                <MySpan>{props.children}</MySpan>
            </MyLabel1>
        </MyLabel>
    )
}

export default Radio
