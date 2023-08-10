export function getBackendUrl() {
    return process.env.REACT_APP_BACKEND_URL
}

export function commonGetJson(url:string, customHeaders?:any) {
    return fetch(getBackendUrl() + url, {
        headers: {
            ...customHeaders,
            token: localStorage.getItem('token')
        },
        method: "GET"
    }).then(x => x.json())
}


export function commonPostJson<T>(url:string, data:T, customHeaders?:any) {
    return fetch(getBackendUrl() + url, {
        headers: {
            ...customHeaders,
            token: localStorage.getItem('token'),
            'Content-Type':'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }).then(x => x.json())
}

export function commonPutJson<T>(url:string, data:T, customHeaders?:any) {
    return fetch(getBackendUrl() + url, {
        headers: {
            ...customHeaders,
            token: localStorage.getItem('token'),
            'Content-Type':'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data)
    }).then(x => x.json())
}

export function commonPatchJson<T>(url:string, data?:T, customHeaders?:any) {
    return fetch(getBackendUrl() + url, {
        headers: {
            ...customHeaders,
            token: localStorage.getItem('token'),
            'Content-Type':'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(data)
    }).then(x => x.json())
}


export function commonDeleteJson(url:string, customHeaders?:any) {
    return fetch(getBackendUrl() + url, {
        headers: {
            ...customHeaders,
            token: localStorage.getItem('token')
        },
        method: "DELETE"
    }).then(x => x.json())
}

export function commonRawPost(url:string,data:any){
    return fetch(getBackendUrl()  + url, {
            method: 'POST',
            body: data
        })
        .then(x => x.json())
}

