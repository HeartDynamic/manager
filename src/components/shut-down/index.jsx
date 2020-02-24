import React from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

function ShutDown(props) {
    ShutDown.handleClickOutside = () => {
        if (event.target === props.tagRef.current) {
            return
        }
        props.onClickCloseMenu()
    }
    return <>{props.children}</>
}

const clickOutsideConfig = {
    handleClickOutside: () => ShutDown.handleClickOutside,
}

export default onClickOutside(ShutDown, clickOutsideConfig)
