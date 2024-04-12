async function trade_code(axios, code, redirect_tail) {
    if (code == null || code == undefined)
        return;

    await axios.post("/api/tradecodeidentify", { authCode: code, redirect_tail: redirect_tail }).then(function (res) {
        sessionStorage.setItem("username", res.headers.username)
        sessionStorage.setItem("avatar", res.headers.avatar)
        sessionStorage.setItem("id", res.headers.id)
        sessionStorage.setItem("access_token", res.headers.access_token)
        sessionStorage.setItem("expires_in", res.headers.expires_in)
        sessionStorage.setItem("refresh_token", res.headers.refresh_token)

        console.log(res.headers.username)
    })

    /*await axios.post("/api/tradecode", { authCode: code, redirect_tail: redirect_tail }).then(res => {
        console.log("res tradecode", res)
        if (res.headers.access_token != undefined) {
        sessionStorage.setItem("access_token", res.headers.access_token)
        sessionStorage.setItem("expires_in", res.headers.expires_in)
        sessionStorage.setItem("refresh_token", res.headers.refresh_token)}
    })
    
    await axios.post("/api/identifyuser",{
        "access_token" : sessionStorage.getItem("access_token"),
        "expires_in" : sessionStorage.getItem("expires_in"),
        "refresh_token" : sessionStorage.getItem("refresh_token")
    }).then(res => {
        console.log("res identify user", res)
        if (res != undefined && res.headers != undefined) {
        sessionStorage.setItem("access_token", res.headers.access_token)
        sessionStorage.setItem("expires_in", res.headers.expires_in)
        sessionStorage.setItem("refresh_token", res.headers.refresh_token)
        sessionStorage.setItem("username", res.headers.username)
        sessionStorage.setItem("avatar", res.headers.avatar)
        sessionStorage.setItem("id", res.headers.id)
        console.log(res.headers.username)}})*/
}

export default trade_code;