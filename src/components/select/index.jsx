import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Menu from './Menu'
const Container = styled.div`
    display: flex;
    position: relative;
`
const MySpan = styled.span`
    height: 32px;
    line-height: 32px;
`
const MyBox = styled.div`
    width: 156px;
    height: 32px;
    line-height: 32px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    &:hover {
        border-color: #40a9ff;
    }
    &:active {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
`
const MyReveal = styled.div`
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`
const MySelected = styled.div``
const MyTriangle = styled.span`
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #d9d9d9;
    transform: rotate(180deg);
`
const Helper = styled.div`
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    text-indent: 15px;
    color: red;
    position: absolute;
    top: 32px;
    left: ${props => (props.leftNumber ? props.leftNumber + 'px' : '14px')};
`
function Select(props) {
    const [isShow, setIsShow] = useState(false)
    const tagRef = useRef(null)

    const handleClickMenu = () => {
        setIsShow(!isShow)
    }
    const handleClickLi = item => {
        let data = {
            id: props.id,
            index: props.index,
            message: props.message,
            name: props.name,
            text: props.text,
            type: props.type,
            value: props.value,
        }
        data.id === undefined && delete data.id
        data.index === undefined && delete data.index
        data.name === undefined && delete data.name
        data.text === undefined && delete data.text
        data.type === undefined && delete data.type
        data.value === undefined && delete data.value
        data.message === undefined && delete data.message
        props.onChange(item, { ...data })
        setIsShow(false)
    }
    const handleCloseMenu = () => {
        setIsShow(false)
    }
    return (
        <Container>
            <MySpan>{props.text}</MySpan>
            <MyBox>
                <MyReveal onClick={handleClickMenu} ref={tagRef} disabled={props.isDisabled}>
                    <MySelected>{props.value}</MySelected>
                    <MyTriangle />
                </MyReveal>
                {!props.isDisabled && isShow && (
                    <Menu
                        options={props.options}
                        onClickCloseMenu={handleCloseMenu}
                        onClickLi={handleClickLi}
                        tagRef={tagRef}
                    />
                )}
            </MyBox>
            {props.message && <Helper leftNumber={props.leftNumber}>{props.message}</Helper>}
        </Container>
    )
}

export default Select
