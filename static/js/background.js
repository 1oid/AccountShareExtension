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
            url: "https://www.baidu.com/"
        }, function(cookies) {
            cookies.forEach(item => {
                cookieText += item.name + "=" + item.value + ";"
            })

            console.log(cookieText)
            $.ajax({
                url: "http://127.0.0.1:8000/set",
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