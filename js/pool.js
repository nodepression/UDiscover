//话题池
window.onload = function pool() {
    var parent = document.getElementById("main");
    var allTopics = null;
    function getData() {
        $.ajax({
            type: "GET",
            url: "http://web.utribe.me/api/v1/find/topics",
	    xhrFields: {withCredentials: true},
            crossDomain: true,
            dataType: "json",
            context: $("body"),
            success: function(myData) {
                allTopics = myData.data;
                init()
            },
            error: function(xhr, type) {
                console.log(type);
                getData()
            }
        })
    }
    getData();
    function addBigTopic(configure) {
        var bigTopic = document.createElement("div");
        bigTopic.className = "bigTopic";
        addPic(bigTopic, configure);
        addText(bigTopic, configure);
        parent.appendChild(bigTopic)
    }
    function addPic(parent, configure) {
        var pic = document.createElement("div");
        pic.className = "pic";
        addImg(pic, configure);
        addFollow(pic, configure);
        addPost(pic, configure);
        parent.appendChild(pic)
    }
    function addText(parent, configure) {
        var text = document.createElement("div");
        text.className = "text";
        text.innerHTML = configure.title;
        parent.appendChild(text)
    }
    function addImg(parent, configure) {
        var img = document.createElement("img");
        img.src = "http://qiniu.utribe.me" + configure.image;
        console.log(img.src);
        img.className = "realPic" + " " + configure.id;
        parent.appendChild(img)
    }
    function addFollow(parent, configure) {
        var follow = document.createElement("div");
        follow.className = "follow";
        follow.innerHTML = configure.follow + "人关注";
        parent.appendChild(follow)
    }
    function addPost(parent, configure) {
        var post = document.createElement("div");
        post.className = "post";
        post.innerHTML = configure.post + "次发帖";
        parent.appendChild(post)
    }
    parent.addEventListener("click", function(e) {
        var target = e.target || e.srcElement;
        var className = e.target.className.split(" ")[0];
        var id = e.target.className.split(" ")[1];
        if (className == "realPic") {
            console.log(id);
            AppInterface.SendLabelId(id)
        }
    });
    function init() {
        for (var i = 0; i < allTopics.length; i++) {
            addBigTopic(allTopics[i])
        }
    }
}
