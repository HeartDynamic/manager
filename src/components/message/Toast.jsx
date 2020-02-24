import React from 'react'
import { render } from 'react-dom'
const notice = (type, content, duration = 2000, onClose) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    // render(
    //     <div>
    //         <i className={type} />
    //         1234656544
    //         {content}
    //     </div>,
    //     document.getElementById('root')
    // )
}

export default {
    info(content, duration, onClose) {
        return notice('fas fa-info-circle', content, duration, onClose)
    },
    success(content, duration, onClose) {
        return notice('fas fa-check-circle', content, duration, onClose)
    },
    warning(content, duration, onClose) {
        return notice('fas fa-exclamation-circle', content, duration, onClose)
    },
    error(content, duration, onClose) {
        return notice('fas fa-times-circle', content, duration, onClose)
    },
    loading(content, duration = 0, onClose) {
        return notice('fas fa-spinner', content, duration, onClose)
    },
}
