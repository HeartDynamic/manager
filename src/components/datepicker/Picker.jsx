import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 2px;
`
const MyInput = styled.input`
    height: 32px;
    width: 100%;
    border: none;
    font-size: 14px;
    line-height: 24px;
    outline: none;
    box-sizing: border-box;
    padding: 4px 11px;
    &::placeholder {
        color: #999;
        user-select: none;
    }
`

function Picker(props, ref) {
    return (
        <Container>
            <MyInput
                type='text'
                value={props.value}
                onChange={props.onChange}
                onFocus={props.onFocus}
                ref={ref}
                placeholder={props.placeholder}
                onBlur={props.onBlur}
                onKeyDown={props.onKeyDown}
            />
        </Container>
    )
}

export default forwardRef(Picker)
