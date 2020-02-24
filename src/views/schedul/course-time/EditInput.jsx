// 编辑input
import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import InputNumber from '../../../components/input-number'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    position: ${props => (props.theme.statu ? 'absolute' : '')};
    top: ${props => (props.theme.statu ? '-26px' : '-2px')};
    width: ${props => (props.theme.isStyled ? '100%' : props.theme.statu ? '50px' : '58px')};
    height: ${props => (props.theme.isStyled ? '40px' : '')};
    svg {
        color: #f26565;
    }
`
const Input = styled.input`
    box-sizing: border-box;
    width: ${props => (props.theme.isStyled ? '100%' : props.theme.statu ? '50px' : '58px')};
    height: ${props => (props.theme.isStyled ? '40px' : '')};
    padding: 0 6px;
    border: 1px solid rgba(22, 208, 255, 1);
    border-radius: 5px;
`
const MyTimesWrap = styled.div`
    width: 16px;
    height: 16px;
    position: absolute;
    top: 2px;
    right: 8px;
    z-index: 1;
    border-radius: 50%;
    cursor: pointer;
`
const MyTimes = styled.div``

function EditInput(props) {
    EditInput.handleClickOutside = () => {
        if (event.target === props.tagRef.current) {
            return
        }
        props.onClickCloseMenu()
    }
    const handleClickDelete = () => {
        props.onClickDelete()
        props.onClickCloseMenu()
    }
    const option = {
        height: '20px',
    }
    return (
        <ThemeProvider theme={{ isStyled: props.isStyled, statu: props.statu }}>
            <Container>
                {props.type === 'text' ? (
                    <Input
                        type={props.type}
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={props.onBlurs}
                        title={props.title}
                    />
                ) : (
                    <InputNumber value={props.value} onChange={props.onChange} min={1} max={100} option={option} />
                )}
                {props.length > 1 && props.isDelete && (
                    <MyTimesWrap onClick={handleClickDelete}>
                        <MyTimes />
                        <FontAwesomeIcon icon={faTimes} />
                    </MyTimesWrap>
                )}
            </Container>
        </ThemeProvider>
    )
}
const clickOutsideConfig = {
    handleClickOutside: () => EditInput.handleClickOutside,
}

export default onClickOutside(EditInput, clickOutsideConfig)
