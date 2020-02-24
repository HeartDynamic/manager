import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/button'

const MyPopUp = styled.div`
    user-select: none;
    width: 200px;
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    top: ${props => (props.styledOptions && props.styledOptions.top) || '80px'};
    left: ${props => (props.styledOptions && props.styledOptions.left) || '-86px'};
    z-index: 2;
    color: red;
    box-shadow: -1px -1px 12px 0px rgba(0, 91, 167, 0.14);
`
const MyTitle = styled.div`
    text-align: center;
    height: 28px;
    line-height: 10px;
    font-size: 14px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: rgba(51, 51, 51, 1);
`
const MyWrapButton = styled.div`
    display: flex;
    justify-content: space-around;
`

const MyTriangleUp = styled.span`
    position: absolute;
    top: -6px;
    right: 50%;
    width: 0;
    height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 10px solid #fff;
    transform: translateX(16px);
`
function PopUp(props) {
    const styledOptions = {
        bgColor: props.styledOptions.bgColor,
        borderColor: props.styledOptions.borderColor,
        HbgColor: props.styledOptions.HbgColor,
        HborderColor: props.styledOptions.HborderColor,
    }
    const styledOptions1 = {
        bgColor: props.styledOptions.bgColor1,
        borderColor: props.styledOptions.borderColor1,
        HbgColor: props.styledOptions.HbgColor1,
        HborderColor: props.styledOptions.HborderColor1,
    }
    return (
        <MyPopUp styledOptions={props.styledOptions}>
            <MyTriangleUp />
            <MyTitle>{props.textData.name}</MyTitle>
            <MyWrapButton>
                <Button
                    styledOptions={styledOptions}
                    onClick={() => props.onClickFunct(props.textData.text, props.textData.index)}
                >
                    {props.textData.text}
                </Button>
                <Button
                    styledOptions={styledOptions1}
                    onClick={() => props.onClickFunct(props.textData.text1, props.textData.index)}
                >
                    {props.textData.text1}
                </Button>
            </MyWrapButton>
        </MyPopUp>
    )
}

export default PopUp
