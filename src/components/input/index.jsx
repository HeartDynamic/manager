import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 56px;
    width: 100%;
    position: relative;
`
const Label = styled.span`
    position: absolute;
    left: 16px;
    top: ${props => (props.valueP ? '-10px' : props.focus ? '-1px' : '5px')};
    font-size: ${props => (props.valueP ? '12px' : props.focus ? '12px' : '14px')};
    transition: top 200ms cubic-bezier(0, 0, 0.2, 1), font-size 200ms cubic-bezier(0, 0, 0.2, 1),
        padding 200ms cubic-bezier(0, 0, 0.2, 1);
    background-color: #fff;
    z-index: ${props => (props.valueP ? '10' : props.focus ? '10' : '1')};
    padding: ${props => (props.focus ? '0 5px' : props.valueP ? '0 5px' : '0')};
`
const Content = styled.input`
    box-sizing: border-box;
    position: absolute;
    /* top: 6px; */
    height: 32px;
    border: none;
    outline: none;
    border-radius: 4px;
    font-size: 14px;
    color: inherit;
    width: calc(100% - 4px);
    padding: 0;
    text-indent: 15px;
    left: 2px;
    z-index: 1;
    background-color: transparent;
`
const Wrap = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    border: 1px solid;
    border-style: solid;
    border-width: ${props => (props.focus ? '2px' : '1px')};
    border-color: ${props => (props.error ? 'red' : props.focus ? '#00a6f3' : 'rgba(0, 0, 0, 0.23)')};
    height: 32px;
    /* top: 4px; */
    border-radius: 4px;
    transition: border-color 200ms cubic-bezier(0, 0, 0.2, 1), border-width 200ms cubic-bezier(0, 0, 0.2, 1);
    &:hover {
        border-color: ${props => (props.error ? 'red' : props.focus ? '#00a6f3' : 'rgba(0, 0, 0, 0.87)')};
    }
    ${Content}:hover + & {
        border-color: ${props => (props.error ? 'red' : props.focus ? '#00a6f3' : 'rgba(0, 0, 0, 0.87)')};
    }
`

const Helper = styled.div`
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    text-indent: 15px;
    color: red;
    position: absolute;
    top: 26px;
`
function Input(props) {
    const [valueP, setValueP] = useState(props.value ? true : false)
    const [focus, setFocus] = useState(false)
    const handleClickWrap = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus()
        }
    }
    const inputRef = useRef(null)
    const handleBlur = () => {
        setFocus(false)
        if (props.value) return
        setValueP(false)
    }
    const handleFocus = () => {
        setFocus(true)
        setValueP(true)
    }
    return (
        <Container className={props.className}>
            <Label valueP={valueP}>{props.label}</Label>
            <Content
                style={{ cursor: props.isDisabled ? 'not-allowed' : 'text' }}
                ref={inputRef}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                focus={focus}
                onKeyUp={props.onKeyUp}
                disabled={props.isDisabled}
            />
            <Wrap onClick={handleClickWrap} active={valueP} focus={focus} error={props.message ? true : false} />
            <Helper>{props.message}</Helper>
        </Container>
    )
}

export default Input
