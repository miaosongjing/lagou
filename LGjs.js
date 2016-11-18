//切换城市弹出层
!function () {
    var city = document.getElementById("selectAll");
    var popUp = document.getElementById("pop-up");
    var outer = document.getElementById("outer");
    var cover = document.getElementById("cover");
    var _inner = document.getElementById("_inner");
    var close = document.getElementById("close");
    var navW = document.documentElement.clientWidth || document.body.clientWidth, navH = document.documentElement.clientHeight || document.body.clientHeight;
    city.onclick = function () {
        popUp.style.display = "block";
        var originW = getCss(outer, "width");
        var originH = getCss(outer, "height");
        outer.style.left = (navW - originW) / 2 + "px";
        outer.style.top = (navH - originH) / 2 + "px";
        popUp.style.opacity = 1;
        var targetObj = {width: 502, height: 484, top: (navH - 484) / 2, left: (navW - 502) / 2};
        animate(outer, targetObj, 300, 3, function () {
            cover.style.display = "none";
            _inner.style.display = "block";
        });
        popUp.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement;
            if (tar.id === "pop-up" || tar.id === "close") {
                animate(popUp, {opacity: 0}, 200, function () {
                    popUp.style.display = "none";
                    _inner.style.display = "none";
                    cover.style.display = "block";
                    outer.style.width = originW + "px";
                    outer.style.height = originH + "px";
                    outer.style.left = (navW - originW) / 2 + "px";
                    outer.style.top = (navH - originH) / 2 + "px";
                })
            }
        };
        popUp.onmouseover = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement;
            console.log(tar);
            if (tar.id === "pop-up") {
                popUp.style.cursor = "pointer"
            } else {
                popUp.style.cursor = "auto"
            }
        }
    }
}();


//轮播图
!function () {
    var oUl = document.getElementById("bannerleft");
    var oLis = oUl.getElementsByTagName("li");
    var _oLis = document.getElementById("bannerright").getElementsByTagName("li");
    var oTip = document.getElementById("tip");
    var oIs = document.getElementById("bannerright").getElementsByTagName("i");
    var step = 0, count = oLis.length;
    console.log(oIs)
    function moveImg() {
        step++;
        if (step >= count) {
            step = 0;
        }
        animate(oUl, {top: -step * 160}, 200);
        selectI();
    }

    autoTimer = window.setInterval(moveImg, 2000);
    function changeMove() {
        for (var i = 0; i < _oLis.length; i++) {
            var cur = _oLis[i];
            cur.index = i;
            cur.onmouseover = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(oUl, {top: -step * 160}, 200);
                animate(oTip, {top: step * 55}, 200);
                selectI();
                autoTimer = window.setInterval(moveImg, 2000);
            }
        }
    }

    changeMove()
    function selectI() {
        for (var i = 0; i < oIs.length; i++) {
            oIs[i].style.display = i === step ? "none" : "block";
            animate(oTip, {top: step * 55}, 200);
        }
    }
}();


// 滑动效果
!function () {
    var oLis = document.getElementById("sleek").getElementsByTagName("li");
    var oDiv = document.getElementById("sleek").getElementsByTagName("div");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].onmouseenter = slipInto.bind(oLis[i], oDiv[i]);
        oLis[i].onmouseleave = slipOut.bind(oLis[i], oDiv[i]);
    }
    function slipInto(curEle, e) {
        var bLeft = offset(this).left;
        var bTop = offset(this).top;
        var bRight = offset(this).left + this.offsetWidth;
        var bBottom = offset(this).top + this.offsetHeight;
        var WH = this.offsetHeight;
        e = e || window.event;
        this["mouseX"] = e.pageX - bLeft;
        this["mouseY"] = e.pageY - bTop;

        if (this.mouseX <= this.mouseY && this.mouseX + this.mouseY < WH) {
            setCss(curEle, "left", -WH);
            setCss(curEle, "top", 0);
            animate(curEle, {left: 0, top: 0}, 200);
            return;
        }
        if (this.mouseX <= this.mouseY && this.mouseX + this.mouseY > WH) {
            setCss(curEle, "left", 0);
            setCss(curEle, "top", WH);
            animate(curEle, {left: 0, top: 0}, 200);
            return;
        }
        if (this.mouseX >= this.mouseY && this.mouseX + this.mouseY < WH) {
            setCss(curEle, "left", 0);
            setCss(curEle, "top", -WH);
            animate(curEle, {left: 0, top: 0}, 200);
            return;
        }
        if (this.mouseX >= this.mouseY && this.mouseX + this.mouseY > WH) {
            setCss(curEle, "left", WH);
            setCss(curEle, "top", 0);
            animate(curEle, {left: 0, top: 0}, 200);
        }
    }

    function slipOut(curEle, e) {
        var bLeft = offset(this).left;
        var bTop = offset(this).top;
        var bRight = offset(this).left + this.offsetWidth;
        var bBottom = offset(this).top + this.offsetHeight;
        var WH = this.offsetHeight;
        e = e || window.event;
        this["mouseL"] = e.pageX;
        this["mouseT"] = e.pageY;
        if (this.mouseL < bLeft + 1) {
            animate(curEle, {left: -WH, top: 0}, 200);
            return
        }
        if (this.mouseL > bRight - 1) {
            animate(curEle, {left: WH, top: 0}, 200);
            return
        }
        if (this.mouseT > bBottom - 1) {
            animate(curEle, {left: 0, top: WH}, 200);
            return
        }
        if (this.mouseT < bTop + 1) {
            animate(curEle, {left: 0, top: -WH}, 200);
        }
    }


}()

//切换选项
!function () {
    var oLis = document.getElementById("job").getElementsByTagName("li");
    var oDiv = document.getElementById("checkjob");
    var oDivs = children(oDiv, "div");
    for (var i = 0; i < oLis.length; i++) {
        var cur = oLis[i];
        cur.index = i;
        cur.onclick = function () {
            for (var j = 0; j < oDivs.length; j++) {
                oDivs[j].style.display = "none";
                oLis[j].className = "";
            }
            this.className = "current";
            oDivs[this.index].style.display = "block";
        }
    }
}();

//scroll事件 以及回到顶部
!function () {
    var oDiv = document.getElementById("footlogo");
    var oFace = document.getElementById("fback");
    var oFire = document.getElementById("fire");

    function init() {
        var winT = (document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop);//1940
        if (winT >= 1940) {
            setCss(oDiv, "position", "relative")
            setGroupCss(oFire, {
                "position": "absolute",
                "right": "114px",
                "bottom": "205px"
            })
            setGroupCss(oFace, {
                "position": "absolute",
                "right": "102px",
                "bottom": "148px"
            })

        } else {
            var cT = document.documentElement.scrollTop || document.body.scrollTop;
            var wH = document.documentElement.clientHeight || document.body.clientHeight;

            if (cT >= (wH / 9)) {
                oFire.style.display = "block";
                oFace.style.display = "block";

            } else {
                oFire.style.display = "none";
                oFace.style.display = "none";
            }
            setCss(oDiv, "position", "fixed");
            setGroupCss(oFire, {
                "position": "fixed",
                "right": "114px",
                "bottom": "140px"
            })
            setGroupCss(oFace, {
                "position": "fixed",
                "right": "102px",
                "bottom": "84px"
            })
        }
    }

    window.onscroll = init;
    oFire.onclick = function () {
        var cT = document.documentElement.scrollTop || document.body.scrollTop;
        var deration = 300;
        var interval = 10;
        var step = (cT / deration) * interval;
        var timer = window.setInterval(function () {
            if (cT <= 0) {
                window.clearInterval(timer);
                return;
            }
            cT -= step;
            document.documentElement.scrollTop = cT;
            document.body.scrollTop = cT;
        }, interval)
    }
}()


//意见反馈
!function () {
    var oFace = document.getElementById("fback");
    var feedBack = document.getElementById("feedback");
    var _close = document.getElementById("_close");

    oFace.onmouseenter = function () {
        feedBack.style.display = "block";
        animate(feedBack, {"opacity": 1}, 500)
    };
    _close.onmouseenter = function () {
        animate(feedBack, {"opacity": 0}, 500, function () {
            feedBack.style.display = "none";
        })
    }
}()


