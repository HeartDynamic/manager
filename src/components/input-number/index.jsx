import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const InputWarp = styled.div`
    position: relative;
`
const MyInput = styled.input`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: ${props => props.option.height || '28px'};
    padding: 0 11px;
    text-align: left;
    background-color: transparent;
    border: 1px solid;
    border-radius: 4px;
    outline: 0;
`
const MySpan = styled.span`
    box-sizing: border-box;
    position: absolute;
    right: 0;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid block;
    svg {
        font-size: 12px;
    }
`
const MySpan1 = styled(MySpan)`
    top: -2px;
    cursor: ${props => (props.prohibited ? 'pointer' : 'not-allowed')};
    border-bottom: 0;
    background-color: ${props => (props.prohibited ? '' : '#ccc')};
    border-top-right-radius: 4px;
`
const MySpan2 = styled(MySpan)`
    bottom: 0;
    cursor: ${props => (props.prohibited ? 'pointer' : 'not-allowed')};
    background-color: ${props => (props.prohibited ? '' : '#ccc')};
`
function InputNumber(props) {
    const handleClick = text => {
        if (text === 'up' && props.max >= props.value + 1) {
            props.onChange(props.value + 1)
        } else if (text === 'down' && props.min <= props.value - 1) {
            props.onChange(props.value - 1)
        }
    }

    const handleChange = event => {
        let value = event.target.value.replace(/[^0-9]/gi, '')
        if (value) {
            value = Number(value)
        }
        props.onChange(value)
    }

    const handleBlur = event => {
        let value = event.target.value.replace(/[^0-9]/gi, '')
        if (value > props.max) {
            props.onChange(props.max)
        } else if (value < props.min) {
            props.onChange(props.min)
        }
    }

    return (
        <InputWarp>
            <MyInput
                type='type'
                value={props.value}
                onChange={handleChange}
                onBlur={handleBlur}
                option={props.option}
            />
            <MySpan1 onClick={() => handleClick('up')} prohibited={props.max >= props.value + 1}>
                <FontAwesomeIcon icon={faChevronUp} />
            </MySpan1>
            <MySpan2 onClick={() => handleClick('down')} prohibited={props.min <= props.value - 1}>
                <FontAwesomeIcon icon={faChevronDown} />
            </MySpan2>
        </InputWarp>
    )
}
export default InputNumber
