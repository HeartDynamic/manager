import React from 'react'
import styled from 'styled-components'
const MyTh = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const MySpan = styled.span``
const MyWrap = styled.div`
    font-size: 12px;
    font-family: MicrosoftYaHeiLight;
    font-weight: 400;
    color: #666;
`
function ThHeader(props) {
    return (
        <MyTh>
            <MySpan>{props.data.name}</MySpan>
            <MyWrap>
                <MySpan>
                    {props.data.startTimeString}~{props.data.endTimeString}
                </MySpan>
            </MyWrap>
        </MyTh>
    )
}
export default ThHeader
