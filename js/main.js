function getCookie(cookie) {
    $.ajax({
        type: "GET",
        url: "http://web.utribe.me/api/v1/find/login",
        data: { id: cookie },
        async: false,
        xhrFields: { withCredentials: true },
        crossDomain: true,
        dataType: "json",
        success: function (myData) {
            console.log(myData)
        },
        error: function (xhr, type) {
            console.log(type);
        }
    })
    discover();
    playCarousel();
};
//发现
function discover() {
    var top3 = $(".hotTopics>.post");
    var official = $(".official>.post");
    var officialPa = $("#official");
    var hotTopicsPa = $("#hotTopics");
    var lookAll = $("#lookAll");
    var hotPosts = null;
    var officialPosts = null;
    (function initFontSize() {
        var myHtml = $("#myHtml");
        var WIDTH = document.documentElement.clientWidth;
        var RATIO = 5.76;
        myHtml[0].style.fontSize = WIDTH / RATIO + "%"
    }());
    function getHotPosts() {
        $.ajax({
            type: "GET",
            url: "http://web.utribe.me/api/v1/find/top",
            xhrFields: { withCredentials: true },
            crossDomain: true,
            dataType: "json",
            context: $("body"),
            success: function (myData) {
                hotPosts = myData.data;
                initHotPosts(hotPosts)
            },
            error: function (xhr, type) {
                console.log(type);
            }
        })
    }
    getHotPosts();
    function getOfficialPosts() {
        $.ajax({
            type: "GET",
            url: "http://web.utribe.me/api/v1/find/recommend",
            xhrFields: { withCredentials: true },
            crossDomain: true,
            dataType: "json",
            context: $("body"),
            success: function (myData) {
                OfficialPosts = myData.data;
                initOfficialPosts(OfficialPosts)
            },
            error: function (xhr, type) {
                console.log(type);
            }
        })
    }
    getOfficialPosts();
    function setString(str, len) {
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                strlen += 2
            } else {
                strlen++
            }
            s += str.charAt(i);
            if (strlen >= len) {
                return s + "..."
            }
        }
        return s
    }
    function initHotPosts(configure) {
        Array.prototype.slice.call(top3).map(function (value, index, array) {
            value.className = "post" + " " + "top" + (index + 1) + " " + configure[index].id;
            var title = setString(configure[index].title, 18);
            value.children[1].innerHTML = title;
            value.children[2].innerHTML = "评论 " + configure[index].reply;
            value.children[3].innerHTML = "点赞 " + configure[index].approval
        })
    }
    function initOfficialPosts(configure) {
        Array.prototype.slice.call(official).map(function (value, index, array) {
            value.className = "post" + " " + "official" + " " + configure[index].id;
            var title = setString(configure[index].title, 20);
            value.children[0].innerHTML = title;
            value.children[1].innerHTML = "评论 " + configure[index].reply;
            value.children[2].innerHTML = "点赞 " + configure[index].approval
        })
    }
    var UA = window.navigator.userAgent;
    var CLICK = "click";
    if (/ipad|iphone|android/.test(UA)) {
        CLICK = "tap"
    }
    hotTopicsPa[0].addEventListener("click", function (e) {
        var target = e.target || e.srcElement;
        var myTarget = $(e.target);
        var id;
        var className = myTarget.attr("class").split(" ")[0];
        if (className == "post") {
            id = myTarget.attr("class").split(" ")[2]
        } else {
            id = myTarget.parents(".post").attr("class").split(" ")[2]
        }
        console.log(id);
        AppInterface.SendTieziId(id)
    });
    officialPa[0].addEventListener("click", function (e) {
        var target = e.target || e.srcElement;
        var myTarget = $(e.target);
        var id;
        var className = myTarget.attr("class").split(" ")[0];
        if (className == "post") {
            id = myTarget.attr("class").split(" ")[2]
        } else {
            id = myTarget.parents(".post").attr("class").split(" ")[2]
        }
        AppInterface.SendTieziId(id)
    });
    lookAll[CLICK](function (e) {
        AppInterface.nextpage("http://qiniu.utribe.me/resource/web/topicsPool.html")
    })
}


//轮播
function playCarousel() {
    var images = null;
    $.ajax({
        type: "GET",
        url: "http://web.utribe.me/api/v1/find/advertisement",
        xhrFields: { withCredentials: true },
        crossDomain: true,
        dataType: "json",
        context: $("body"),
        success: function (myData) {
            images = myData.data;
            initImages(images);
        },
        error: function (xhr, type) {
            console.log(type);
        }
    })


    var pics = $(".swiper-slide");
    var parent = $("#carousel");

    function initImages(imgs) {
        Array.prototype.slice.call(pics).map(function (value, index, array) {
            console.log(imgs.length);
            if(index<imgs.length){

            }else{
                index = index%3;
            }
            var img = document.createElement("img");
            img.src = "http://qiniu.utribe.me/resource/advertisement/" + imgs[index].id;//图片id(地址）

            if(imgs[index].type==0){
                value.className = "swiper-slide" + " " + imgs[index].attachId +" "+"nothing"//帖子id
            }else if(imgs[index].type==1){
                value.className = "swiper-slide" + " " + imgs[index].attachId +" "+"post"//帖子id

            }else if(imgs[index].type==2){
                value.className = "swiper-slide" + " " + imgs[index].attachId +" "+"web"//帖子id
            }
            value.appendChild(img);

        })
    }
    //判断是否支持tap事件
    var UA = window.navigator.userAgent;
    var CLICK = 'click';
    if (/ipad|iphone|android/.test(UA)) {
        CLICK = 'tap';
    }

    parent[0].addEventListener("click", function (e) {
        var target = e.target || e.srcElement;
        var myTarget = $(e.target);
        var type = myTarget.parents(".swiper-slide").attr("class").split(" ")[2];
        var id = myTarget.parents(".swiper-slide").attr("class").split(" ")[1];
        if(type=="nothing"){};//单纯轮播图 没有跳转地址
        if(type=="post"){
            console.log(id);
            AppInterface.SendTieziId(id); //此处调用安卓端函数实现跳转
        }
        if(type=="web"){
            console.log(id);
            AppInterface.nextpage(id);//跳转到相应网页
        }

    });
}


