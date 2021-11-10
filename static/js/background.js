console.log("background")
const CONFIG = {
    user: "Loid"
}
/**
 * 注册右键菜单
 * */
chrome.contextMenus.create({
    title: "共享当前Cookie",
    onclick: function (info, tab) {
        console.log(tab)
        let cookieText = ""

        chrome.cookies.getAll({
            url: tab.url
        }, function(cookies) {
            cookies.forEach(item => {
                cookieText += item.name + "=" + item.value + ";"
            })

            console.log(cookieText)
            $.ajax({
                url: SERVER.addr + "/set",
                method: "POST",
                data: {
                    cookie: JSON.stringify(cookies),
                    user: CONFIG.user,
                    url: tab.url,
                    favicon: tab.favIconUrl,
                    title: tab.title
                },
                success: res => {
                    console.log(res)
                }
            })
        })
    }
})

chrome.contextMenus.create({
    title: "清除当前网站Cookie",
    onclick: function (info, tab) {

        chrome.cookies.getAll({
            url: tab.url
        }, function(cookies) {
            cookies.forEach(item => {
               chrome.cookies.remove({
                   url: tab.url,
                   name: item.name
               }, t => {

               })
            })
            alert("清除成功")
        })
    }
})