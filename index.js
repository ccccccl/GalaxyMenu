/*
* @Author: Chen
* @Date:   2019-2-25 15:49:29
* @Last Modified by:   Chen
* @Last Modified time: 2019-03-04 14:25:37
*/

$(function(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;

    if(isIE || isEdge || isIE11){
        alert('为了更好的体验，建议您使用谷歌浏览器或火狐浏览器进行访问。')
    }

    //初始化数据
    var data = [
        {
            name: '首页',
            class: 'leadingDriver',
            url: '#'
        },{
            name: '模块1',
            class: 'studyBigData',
            url: '#'
        },{
            name: '模块2',
            class: 'oneCardBigData',
            url: '#'
        },{
            name: '模块3',
            class: 'teachingBigData',
            url: '#'
        },{
            name: '模块4',
            class: 'employBigData',
            url: '#'
        },{
            name: '模块5',
            class: 'teacherBigData',
            url: '#'
        },{
            name: '模块6',
            class: 'subjectBigData',
            url: '#'
        },{
            name: '模块7',
            class: 'dataSearchEngine',
            url: '#'
        },{
            name: '模块8',
            class: 'questionnaireInvest',
            url: '#'
        }
    ];

    var orbit = $('#mainOrbit'),
        num = data.length,
        _html = ''
        width = (100 + 50 / num) * window.innerWidth / 1920;
    for(var i = 0; i < num; i++){
        _html += `<li class="pos ${data[i].class}">
            <div class="planet">
              <a class="infos" href="${data[i].url}"></a>
              <dd>${data[i].name}</dd>
            </div>
          </li>`
    }
    orbit.append(_html);
    $('#mainOrbit .planet').css({'width': width + 'px', 'height': width + 'px'})


    var w = orbit.width(),
        r = w / 2,
        startAngle = 0,
        endAngle = 360,
        gap = (endAngle - startAngle) / num;
    $('#mainOrbit li').each(function (index, elem) {
        var angle = gap * index * (Math.PI / 180),
            x = r + r * Math.cos(angle) - width / 2,
            y = r + r * Math.sin(angle) - width / 2;
        $(elem).css({top: y, left: x})
    })

    //交互
    $('#mainOrbit .infos').hover(function(e){
        planet = e.target.parentNode
        $('#mainOrbit').css('animation-play-state', 'paused')
        $('#mainOrbit li').css('animation-play-state', 'paused')
        $(planet).css({'width': (width * 1.2) + 'px', 'height': (width * 1.2) + 'px'})
    }, function(e){
          planet = e.target.parentNode
          $(planet).css({'width': width + 'px', 'height': width  + 'px'})
          $('#mainOrbit').css('animation-play-state', 'running')
          $('#mainOrbit li').css('animation-play-state', 'running')
    })


    //银河
    var img = new Image();
    img.src="./assets/bj.png";

    img.onload = function(){
        var //canvas = document.getElementsByClassName('canvas')[0],
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight,
            hue = 236,
            stars = [],
            count = 0,
            maxStars = 1000;
            canvas.className = 'canvas';
            document.body.appendChild(canvas);
        var canvas2 = document.createElement('canvas'),
            ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width / 2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#666');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 20%, 5%)');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 20%, 6%)');
        gradient2.addColorStop(0.1, 'transparent');
        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }
            if (min > max) {
                var hold = max;
                max = min;
                min = hold;
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
            var max = Math.max(x, y),
                diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
        }
        var Star = function () {
            this.orbitRadius = random(maxOrbit(w, h));
            this.radius = random(60, this.orbitRadius) / 8;
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 800000;
            this.alpha = random(20, 10) / 10;
            count++;
            stars[count] = this;
        }
        Star.prototype.draw = function () {
            var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                twinkle = random(10);
            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
            }
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
        }
        for (var i = 0; i < maxStars; i++) {
            new Star();
        }

        function animation() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.5;
            //ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
            ctx.drawImage(img, 0, 0);
            //ctx.fillRect(0, 0, w, h)
            ctx.globalCompositeOperation = 'lighter';
            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
            };
            window.requestAnimationFrame(animation);
        }
        animation();
    }


    $(window).resize(function() {
        location.reload()
    });

})