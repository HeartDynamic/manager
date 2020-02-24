import React from 'react'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'
const MyUl = styled.ul`
    width: 156px;
    max-height: 150px;
    overflow: auto;
    background-color: #fafafa;
    position: absolute;
    z-index: 2;
    top: 28px;
    border-radius: 4px;
    font-weight: normal;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`
const MyLi = styled.li`
    padding: 0 10px;
    &:hover {
        background-color: #e6f7ff;
    }
`
const MyLiSpan = styled.span``

function SelectMenu(props) {
    SelectMenu.handleClickOutside = event => {
        if (event.target === props.tagRef.current) return
        props.onClickCloseMenu()
    }
    return (
        <MyUl>
            {props.options.map((item, index) => (
                <MyLi key={item.id} onClick={() => props.onClickLi(item, index)}>
                    <MyLiSpan>{item.name}</MyLiSpan>
                </MyLi>
            ))}
        </MyUl>
    )
}
const clickOutsideConfig = {
    handleClickOutside: () => SelectMenu.handleClickOutside,
}

export default onClickOutside(SelectMenu, clickOutsideConfig)
