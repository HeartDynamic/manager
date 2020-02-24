function isLeapYearP(year) {
    if ((year % 4 === 0 && year % 4 !== 0) || year % 400 === 0) return true
    return false
}

export function checkDate(date) {
    const reg = /^\d{4}(\/)(0[1-9]|1[0-2])\1(0[1-9]|[1-2][0-9]|3[0-1])$/
    const [year, month, day] = date.split('/')
    return reg.test(date)
        ? month === '02'
            ? isLeapYearP(parseInt(year))
                ? parseInt(day) <= 29
                    ? true
                    : false
                : parseInt(day) <= 28
                ? true
                : false
            : ['04', '06', '09', '11'].includes(month)
            ? parseInt(day) <= 30
                ? true
                : false
            : true
        : false
}
