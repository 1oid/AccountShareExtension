var sessionList = []
var currentSelect = null

$.ajax({
    url: SERVER.addr + "/set",
    method: "GET",
    success: res => {
        console.log(res)
        let html = ""

        sessionList = res.data

        res.data.forEach((item, index) => {
            html += `<div class="session-item-card">
             <div class="session-item ${index%2!==0?"color-blue": ""}">
                <div class="title">${item.title}</div>
                 <div class="desc">${item.user+" - "+item.create_time}</div>

             </div>
             <div class="options">
                 <button v="${index}" class="delete">删除</button>
                 <button v="${index}" class="use">使用</button>
             </div>
         </div>`
        })

        $(".sessions").html(html)

        $(".session-item").click(e => {
            console.log("session item")
            if(currentSelect !== null) {
                currentSelect.style.left = "0px"
            }
            currentSelect = e.currentTarget
            currentSelect.style.position = "relative"
            currentSelect.style.left = "-60px"
        })

        $(".delete").click(e => {
            alert("还没写")
        })

        $(".use").click(e => {
            let v = parseInt(e.currentTarget.getAttribute("v"))
            let cookies = JSON.parse(sessionList[v].cookie)

            cookies.forEach(item => {
                chrome.cookies.set({
                    domain: item.domain,
                    expirationDate: item.expirationDate,
                    httpOnly: item.httpOnly,
                    name: item.name,
                    path: item.path,
                    sameSite: item.sameSite,
                    secure: item.secure,
                    storeId: item.storeId,
                    value: item.value,
                    url: sessionList[v].url
                }, t => {

                })
            })

            chrome.tabs.create({
                url: sessionList[v].url
            })
        })
    }
})


$(".session-item").click(e => {
    console.log("session item")
    // e.currentTarget.appendChild()
    if(currentSelect !== null) {
        currentSelect.style.left = "0px"
        //     currentSelect.className = currentSelect.className.replace(" selected", "")
    }
    currentSelect = e.currentTarget
    currentSelect.style.position = "relative"
    currentSelect.style.left = "-50px"
})