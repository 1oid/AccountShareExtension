var sessionList = []

$.ajax({
    url: SERVER.addr + "/set",
    method: "GET",
    success: res => {
        console.log(res)
        let html = ""

        sessionList = res.data

        res.data.forEach((item, index) => {
            html += "<div class=\"session-item\" v=\""+index+"\">\n" +
                "            <h2>"+item.title+" - "+item.user+" - "+item.create_time+"</h2>\n" +
                "         </div>"
        })

        $(".sessions").html(html)

        $(".session-item").click(e => {
            console.log("session item")
            // e.currentTarget.appendChild()
            // if(currentSelect !== null) {
            //     currentSelect.className = currentSelect.className.replace(" selected", "")
            // }
            // currentSelect = e.currentTarget
            // currentSelect.className += " selected"
            console.log(e.currentTarget.getAttribute("v"))
            let v = parseInt(e.currentTarget.getAttribute("v"))

            console.log(JSON.parse(sessionList[v].cookie))


        })
    }
})

var currentSelect = null

$(".session-item").click(e => {
    console.log("session item")
    // e.currentTarget.appendChild()
    // if(currentSelect !== null) {
    //     currentSelect.className = currentSelect.className.replace(" selected", "")
    // }
    // currentSelect = e.currentTarget
    // currentSelect.className += " selected"
    console.log(e.currentTarget.getAttribute("v"))

})