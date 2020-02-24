import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'
import Button from '../../../components/button'

const Container = styled.div`
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    transform: translateX(-170px);
    top: 50px;
    z-index: 2;
    color: red;
    box-shadow: -1px -1px 12px 0px rgba(0, 91, 167, 0.14);
`
const MyButtonWrap = styled.div``
const MyWrapButton = styled.div`
    user-select: none;
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
function PlusType(props) {
    const [isShowName, setIsShowName] = useState([
        {
            id: 1,
            name: '数学',
        },
        {
            id: 2,
            name: '物理',
        },
        {
            id: 3,
            name: '化学',
        },
        {
            id: 4,
            name: '生物',
        },
    ])
    PlusType.handleClickOutside = (event, index) => {
        if (event.target === props.tagRef.current) {
            return
        }
        props.onClickCloseMenu()
    }
    const handleClickPlusType = text => {
        props.onClickPlusType(text, props.data)
        props.onClickCloseMenu()
    }
    const styledOptions = {
        color: '#3F9AE6',
        HColor: '#fff',
        HbgColor: '#318BD8',
        HborderColor: '#318BD8',
    }
    return (
        <Container>
            <MyTriangleUp />
            <MyWrapButton>
                {isShowName.map((item, index) => {
                    return (
                        props.isName !== item.name && (
                            <MyButtonWrap key={item.id}>
                                <Button styledOptions={styledOptions} onClick={() => handleClickPlusType(item)}>
                                    {item.name}
                                </Button>
                            </MyButtonWrap>
                        )
                    )
                })}
                {props.isName !== '' && props.isName !== null && (
                    <Button styledOptions={styledOptions} onClick={() => handleClickPlusType({ id: 0, name: '无' })}>
                        无
                    </Button>
                )}
            </MyWrapButton>
        </Container>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => PlusType.handleClickOutside,
}

export default onClickOutside(PlusType, clickOutsideConfig)
