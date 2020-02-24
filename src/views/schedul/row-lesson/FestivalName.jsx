import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import PlusType from './PlusType'

const Container = styled.div`
    position: relative;
    flex: 1;
`
const MyWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    background-color: #fff;
`
const MySpan = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    background-color: ${props => (props.isType ? '#3a93df' : '#fff')};
    color: ${props => (props.isType ? '#fff' : '#333')};
    cursor: ${props => (props.isCursor ? 'pointer' : 'auto')};
    border-radius: 10px;
    :hover {
        box-shadow: ${props => (props.isCursor ? '0px 5px 12px 0px rgba(31, 45, 132, 0.5)' : '')};
        background-color: ${props => (props.isCursor ? '#3a93df' : '')};
        color: ${props => (props.isCursor ? '#fff' : '#333')};
    }
`
function FestivalName(props) {
    const [isType, setIsType] = useState(false)
    const tagRef = useRef(null)
    const handleClickType = () => {
        if (props.data.type !== 1) {
            setIsType(!isType)
        }
    }
    const handleClickTypeMenu = () => {
        setIsType(false)
    }
    const handleClickPlus = text => {
        props.onClickPlusAndEdit(text, props.data)
    }
    return (
        <Container>
            <MyWrap borderIdx={props.borderIdx}>
                <MySpan isType={isType} isCursor={props.data.type !== 1} onClick={handleClickType} ref={tagRef}>
                    {props.data.name}
                </MySpan>
            </MyWrap>
            {isType && (
                <PlusType
                    tagRef={tagRef}
                    onClickCloseMenu={handleClickTypeMenu}
                    onClickPlusType={handleClickPlus}
                    isName={props.data.name}
                />
            )}
        </Container>
    )
}

export default FestivalName
