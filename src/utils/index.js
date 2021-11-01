/**
 * Created by webszy on 01/11/21.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export const parseTime = function(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return time_str
}
export const dayDiffFromNow = (endTime, baseTime) => {
    // const now = new Date().getTime()
    // endTime = new Date(endTime).getTime()
    return Math.floor((endTime - baseTime) / (24 * 3600 * 1000))
}
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export const formatTime = (time, option) => {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export const param2Obj = (url) => {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
        '"}'
    )
}
//判断是对象是否不存在
export const notUndefined = (obj) => {
    return typeof obj !== 'undefined' && obj !== null
}
export const isObj = (obj) => {
    const typeCheck = typeof obj !== 'undefined' && typeof obj === 'object' && obj !== null
    return typeCheck && Object.keys(obj).length > 0
}
//数字每三位加逗号
export const parseNum = (num) => {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
//获取qs
export const getURLParams = (url) => {
    const q = {}
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => {
        q[k] = v
    })
    return q
}

export const handleCookie = (cookieStr) => {
    const getAllCookie = function (str) {
        const cookieArr = str.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nIdx = 0; nIdx < cookieArr.length; nIdx++) {
            cookieArr[nIdx] = decodeURIComponent(cookieArr[nIdx]);
        }
        const cookieObj = {}
        const arr = cookieArr.filter(e => {
            return !['Domain', 'expires', 'Max-Age', 'Path', 'urlgen'].includes(e) &&
                !e.startsWith('_hp2')
        })
        for (const k of arr) {
            let temp = cookieStr.match(new RegExp("(^| )" + k + "=([^;]*)(;|$)"));
            if (temp !== null) {
                cookieObj[k] = temp[2]
            }
        }
        return cookieObj
    }
    cookieStr = cookieStr.replace(/Secure\,/ig, '').replace(/Secure/ig, '')
    const cookieObj = getAllCookie(cookieStr)
    return cookieObj
    // return {
    //   str: json2CookieStr(cookieObj),
    //   json: cookieObj
    // }
}
export const json2CookieStr = (obj) => {
    let cookieStr = ''
    for (const k in obj) {
        const str = k + '=' + obj[k] + '; '
        cookieStr += str
    }
    return cookieStr
}
export const checkImage = (url) => {
    // console.log('checkImage url: ', url);
    if (typeof url !== 'string') {
        return Promise.resolve(false)
    }
    return new Promise((reslove, reject) => {
        if (!url.startsWith('http') && !url.startsWith('data:image')) {
            if (url.endsWith('png') || url.endsWith('jpg') || url.endsWith('jpeg')) {
                url = location.origin + url
            } else {
                reslove && reslove(false)
            }
        }
        const img = new Image
        img.src = url
        img.onload = function () {
            reslove && reslove(true)
        }
        img.onerror = function () {
            reslove && reslove(false)
        }
    })
}
export const isExpired = (ts) => {
    const now = new Date()
    const time = new Date(ts)
    const timeDiff = 10 * 60 * 60 * 1000
    return !(now.getTime() - ts <= timeDiff && now.getDate() === time.getDate());
}
export const shortenLargeNumber = (num, digits) => {
    const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
    let decimal = null

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);
        if (num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }
    return num;
}
export const getCountryCode = (language) => {
    const arr = language.toLowerCase().split('-')
    const firstCode = arr.slice(0, 1)[0]
    const lastCode = arr.slice(-1)[0]
    if (firstCode === 'zh') {
        if (lastCode === 'sg') {
            return 'SG'
        }
        return 'CN'
    }
    if (firstCode === 'gsw') {
        return 'FR'
    }
    if (lastCode === 'latn') {
        return 'ES'
    }
    if (['az-Cyrl', 'az-Latn', 'az-Latn-AZ', 'az-Cyrl-AZ'].includes(language)) {
        return 'AZ'
    }
    if (['bs-Latn', 'bs-Cyrl', 'bs-Latn-BS', 'bs-Cyrl-BS'].includes(language)) {
        return 'FR'
    }
    if (['ha-Latn', 'ha-Latn-NG'].includes(language)) {
        return 'NG'
    }
    if (firstCode === 'mk') {
        return 'MK'
    }
    if (['sr-Latn', 'sr-Cyrl'].includes(language)) {
        return 'RS'
    }
    if (language === 'tg-Cyrl') {
        return 'TJ'
    }
    if (language === 'tzm-Latn') {
        return 'DZ'
    }
    if (['iu-Latn', 'iu-Cans'].includes(language)) {
        return 'CA'
    }
    if (language === 'en-029') {
        return 'CU'
    }
    return lastCode.toUpperCase()
}
export const getRandom = (n, m) => {
    var num = Math.floor(Math.random() * (m - n + 1) + n)
    return num
}
export const waitSeocond = (second) => {
    return new Promise(resolve => setTimeout(resolve, second * 1000))
}
export const parseTimeout = (timeSpent) => {
    let minute = Math.floor(timeSpent / 60 % 60)
    let second = Math.floor(timeSpent % 60)
    const pendingZero = function (num, size) {
        const s = '0000000000000' + num
        return s.substr(s.length - size)
    }
    return pendingZero(minute, 2) + ' : ' + pendingZero(second, 2)
}
export const isSameDay = (ts) => {
    const now = new Date()
    const time = new Date(ts)
    return now.getTime() - ts < 24 * 60 * 60 * 1000 && now.getDate() === time.getDate()
}
export const isIphonex = () => {
    // X XS, XS Max, XR
    const xSeriesConfig = [
        {
            devicePixelRatio: 3,
            width: 375,
            height: 812
        },
        {
            devicePixelRatio: 3,
            width: 414,
            height: 896
        },
        {
            //12
            devicePixelRatio: 3,
            width: 390,
            height: 844
        },
        {
            //12 pro max
            devicePixelRatio: 3,
            width: 428,
            height: 926
        },
        {
            devicePixelRatio: 2,
            width: 414,
            height: 896
        }
    ];
    // h5
    if (typeof window !== 'undefined' && window) {
        const isIOS = /iphone/gi.test(window.navigator.userAgent);
        if (!isIOS) return false;
        const {devicePixelRatio, screen} = window;
        const {width, height} = screen;
        return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height);
    }
    return false;
}
