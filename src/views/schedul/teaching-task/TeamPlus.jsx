import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import TeamPopconfirm from './TeamPopconfirm'

const Wrap = styled.div`
    position: relative;
    cursor: pointer;
    :hover svg {
        color: #3e99e6;
    }
`
const MyPlusWrap = styled.div`
    position: relative;
`

function Schedul(props) {
    const tagRef = useRef(null)
    return (
        <MyPlusWrap>
            <Wrap onClick={() => props.onClickPop('plus', props.data, props.index)} ref={tagRef} title='添加教学班级'>
                <FontAwesomeIcon icon={faPlus} />
            </Wrap>
            {props.isPlus && props.isIndexPlus === props.index && (
                <TeamPopconfirm
                    onClickCloseMenu={props.onClickCloseMenu}
                    onClickPlus={props.onClickPlus}
                    tagRef={tagRef}
                    teamData={props.teamData}
                />
            )}
        </MyPlusWrap>
    )
}

export default Schedul
