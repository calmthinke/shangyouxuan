window.onload = function () {
    //类似全局变量记录图片列表中的下标，默认第一个
    let bigimgidx = 0

    navpathdatabind()
    function navpathdatabind() {
        // 获取路径导航的页面元素
        // 再来获取所需要的数据（data.js)
        // 由于数据动态产生，相应的dom元素也要动态产生，所以根据数据的数量创建dom元素

        let nav2 = document.querySelector('#wrapper .content .banxin .nav2')

        let path = goodData.path;//数组对象

        for (let i = 0; i < path.length; i++) {
            //创建a标签
            let anode = document.createElement('a')
            //向a标签中写入参数
            anode.href = path[i].url
            anode.innerText = path[i].title
            //创建i标签
            let inode = document.createElement('i')
            //向i标签中写入参数
            inode.innerText = '/'

            //向主标签内追加a标签
            nav2.appendChild(anode)
            //向主标签内追加i标签
            if (i != path.length - 1)
                nav2.appendChild(inode)
        }
    }


    //放大镜的移入移出
    bigclassbind()
    function bigclassbind() {
        /*
        获取小图元素，设置移入事件（mouseenter）
        动态创建mask元素与大图元素
        移出时，移除mask与大图片
        */
        let top = document.querySelector('#wrapper .content .banxin .center .left .top ')
        let small = document.querySelector('#wrapper .content .banxin .center .left .top .small')

        //获取数据
        let imagessrcc = goodData.imagessrc
        //设置鼠标移入事件
        // mouseover--有冒泡,有事件委托
        // mouseenter--没冒泡，没有事件委托
        small.addEventListener('mouseenter', function () {
            // 1.创建蒙版元素
            let maskdiv = document.createElement('div')
            maskdiv.className = 'mask'
            // 将蒙版元素追加给small标签
            small.appendChild(maskdiv)
            //2.创建大盒子
            let bigdiv = document.createElement('div')
            bigdiv.className = 'big'
            //将大盒子追击给父级top
            top.appendChild(bigdiv)

            //3.创建img 元素
            let bigimg = document.createElement('img')
            bigimg.src = imagessrcc[bigimgidx].b
            bigimg.alt=' '
            //将img追加给大盒子
            bigdiv.appendChild(bigimg)

            //5.鼠标移动拖拽效果
            small.addEventListener('mousemove', function (e) {
                //5.1蒙版元素的移动
                // 鼠标在small里面的坐标=鼠标在页面的坐标-small在页面中的坐标
                //  e.pageX 鼠标在页面中的坐标
                // small.getBoundingClientRect().left  small盒子在页面中的坐标
                // let left = e.pageX - small.getBoundingClientRect().left;
                let left = e.clientX - small.getBoundingClientRect().left - maskdiv.offsetWidth / 2;

                let top = e.clientY - small.getBoundingClientRect().top - maskdiv.offsetWidth / 2;
                // offsetWidth--元素本身的宽度
                // clientWidth---元素本身宽度，不含边框
                if (left < 0) {
                    left = 0
                } else if (left > small.clientWidth - maskdiv.offsetWidth) {
                    left = small.clientWidth - maskdiv.offsetWidth
                }
                if (top < 0) {
                    top = 0
                } else if (top > small.clientHeight - maskdiv.offsetHeight) {
                    top = small.clientHeight - maskdiv.offsetHeight
                }
                maskdiv.style.left = left + 'px'
                maskdiv.style.top = top + 'px'


                //5.2 大盒子中图片的移动
                let scale = (small.clientWidth - maskdiv.offsetWidth) / (bigdiv.offsetWidth - bigimg.clientWidth)
                bigimg.style.left = left / scale + 'px'
                bigimg.style.top = top / scale + 'px'


            })

            //4.设置移除事件
            // small.addEventListener('mouseleave', function () {
            //     top.removeChild(bigdiv)
            //     small.removeChild(maskdiv)
            // })
                small.onmouseleave=function ()
                {
                  top.removeChild(bigdiv)
                 small.removeChild(maskdiv)
                }

        }
        )



    }


    //动态渲染放大镜
    thumbnaidata()
    function thumbnaidata() {
        //动态生成图片列表
        /*
    获取list元素下的ul
    在获取data.js下的数组
    遍历数组，根据数组的长度创建li
        */

        let ul = document.querySelector('#wrapper .content .banxin .center .left .button .list ul')
        let imagessrc = goodData.imagessrc//数组

        for (let i = 0; i < imagessrc.length; i++) {
            //遍历创建元素
            let newli = document.createElement('li')
            let newimg = document.createElement('img')

            newimg.src = imagessrc[i].s
            newimg.alt=' '
            //追加元素
            newli.appendChild(newimg)
            ul.appendChild(newli)

        }


    }

    //.点击缩略小图效果
    thumbnaiclick()
    function thumbnaiclick() {
        /*
        获取li元素，循环发生点击事件
        由点击的缩略图小标，确定大图与小图路径替换掉现有的src
        */
        let linodes = document.querySelectorAll('#wrapper .content .banxin .center .left .button .list ul li')
        let smallimg = document.querySelector('#wrapper .content .banxin .center .left .top .small img')
        let imagessrccc = goodData.imagessrc

        for (let i = 0; i < linodes.length; i++) {
            linodes[i].addEventListener('click', function () {
                let idx = i
                bigimgidx = idx
                smallimg.src = imagessrccc[idx].s
            })
        }
    }
    //点击缩略图左右箭头效果
    thumbnaileftrightclick()
    function thumbnaileftrightclick() {
        /*
        获取左右箭头元素

        获取可视的div，ul,与所有li

        发生点击事件{
            发生起点，步长，总体运动的距离值=ul-div框
        }
        */

        let pre = document.querySelector('#wrapper .content .banxin .center .left .button .pre')
        let next = document.querySelector('#wrapper .content .banxin .center .left .button .next')

        let list = document.querySelector('#wrapper .content .banxin .center .left .button .list')
        let ul = document.querySelector('#wrapper .content .banxin .center .left .button .list ul')
        let linodes = document.querySelectorAll('#wrapper .content .banxin .center .left .button .list ul li')

        //计算
        let start = 0//起点
        let step = (linodes[0].offsetWidth + 20) * 2 //步长：点击后一次走了两张
        let endpositon = (linodes.length - 5) * (linodes[0].offsetWidth + 20)//总体运动的距离值
        //发生事件
        pre.addEventListener('click', function () {
            start -= step
            if (start < 0) {
                start = 0
            }

            ul.style.left = -start + 'px'
        })

        next.addEventListener('click', function () {
            start += step
            if (start > endpositon) {
                start = endpositon
            }
            ul.style.left = -start + 'px'
        })


    }
    //商品详情数据的动态渲染
    righttopdata()
    function righttopdata() {
        /*
        1.查找righttop元素
        2.查找data.js里面的数据
        3.建立字符串变量，将原来对应的布局结构贴进来，将对应的数据放在对应的元素上，重新渲染吧页面
        */
        const righttop = document.querySelector('#wrapper .content .banxin .center .right .rightop')
        const goodsDetail = goodData.goodsDetail
        const s = `
                            <h3>${goodsDetail.title}</h3>
                            <p>${goodsDetail.recommend}</p>
                            <div class="pricewrap">
                                <div class="pricetop">
                                    <span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                                    <div class="price">
                                        <span>￥</span>
                                        <p>${goodsDetail.price}</p>
                                        <i>降价通知</i>
                                    </div>
                                    <p>
                                        <span>累计评价</span>
                                        <span>${goodsDetail.evaluateNum}</span>
                                    </p>
                                </div>
                                <div class="pricebuttom">
                                    <span>促&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                                    <p>
                                        <span>加价购</span>
                                        <span>满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</span>
                                    </p>
                                </div>

                            </div>
                            <div class="support">
                                <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                                <p>以旧换新，闲置手机回收 4G套餐超值抢 礼品购</p>
                            </div>
                            <div class="address">
                                <span>配&nbsp;送&nbsp;至</span>
                                <p>${goodsDetail.address}</p>
                            </div>
            `
        righttop.innerHTML = s
    }
    //商品参数的动态渲染
    rightButtomData()
    function rightButtomData() {
        /*
        找数据  or 找元素
        //1.找元素对象
        //2.查找数据--data.js 里面的数据
        //3.由于数据为数组，需要遍历，有一个数组元素就要有一个动态的dl对象
        */
        //1.找元素对象
        const choosewrap = document.querySelector('#wrapper .content .banxin .center .right .rightbuttom .choosewrap')
        //2.查找数据
        const crumbData = goodData.goodsDetail.crumbData
        //3.循环创建
        for (let i = 0; i < crumbData.length; i++) {
            let dl = document.createElement('dl')
            let dt = document.createElement('dt')

            //写入
            dt.innerHTML = crumbData[i].title

            //dl 追加dt
            dl.appendChild(dt)

            //dd所指代的数据 又为数组 需要遍历
            for (let j = 0; j < crumbData[i].data.length; j++) {
                //创建dd
                let ddnode = document.createElement('dd')

                //dd 写入值
                ddnode.innerHTML = crumbData[i].data[j].type
                ddnode.setAttribute('price', crumbData[i].data[j].changePrice)

                //dl  追加dd
                dl.appendChild(ddnode)
            }

            //chooosewrap 追加dl
            choosewrap.appendChild(dl)
        }
    }
    //点击商品数据
    clickddbind()
    function clickddbind() {
        /**
         * 点击颜色 后的排他效果
         * 1.获取所有的dl元素，选取其中一个dl做测试（所有的dl上套个循环）
         * 2.循环所有的dd元素，并添加点击事件
         * 3.确定发生事件的目标原对象 设置其颜色为红色 将其他元素重置为基础颜色
         */
        /**
         * 点击之后产生mark
         * 1.创建一个可以容纳dd元素值的容器--数组，确定数组的起始长度，添加一些默认值
         * 2.将点击的dd元素的值按照对应下标写到数组的元素身上
         */
        const dls = document.querySelectorAll('#wrapper .content .banxin .center .right .rightbuttom .choosewrap dl')
        const arr = new Array(dls.length)
        const choose = document.querySelector('#wrapper .content .banxin .center .right .rightbuttom .choose')

        //数组填充0值
        arr.fill(0)

        for (let t = 0; t < dls.length; t++) {
            let dds = dls[t].querySelectorAll('dd')
            //dd发生点击事件
            for (let i = 0; i < dds.length; i++) {
                dds[i].addEventListener('click', function () {
                    //清空choose元素--每次点击后arr 数组都会重新遍历写入页面
                    choose.innerHTML = ""
                    //《一》颜色排他效果实现
                    //1.让每一个dd颜色初始化
                    for (let j = 0; j < dds.length; j++) {
                        dds[j].style.color = "#666"
                    }
                    //2.点击的dd实现颜色改变
                    this.style.color = "red"
                    //《二》点击后 mark 元素出现
                    //2.1点击后动态产生一个新的mark元素
                    arr[t] = this//数组存的是dd
                    changepriceBind(arr)

                    //2.2遍历arr 数组将非0元素的值写入,并追加给页面
                    arr.forEach(function (value, index) {
                        if (value) {
                            //创建div元素
                            let maskdiv = document.createElement('div')
                            //设置class属性
                            maskdiv.className = "mark"
                            //设置值
                            maskdiv.innerText = value.innerText
                            //创建a元素
                            let anode = document.createElement('a')
                            //设置下标
                            anode.setAttribute('index', index)
                            //设置值
                            anode.innerText = "X"
                            //让div追加a
                            maskdiv.appendChild(anode)
                            //让choose元素追加div
                            choose.appendChild(maskdiv)

                        }
                    })

                    //2.3获取所有的a标签，循环发生点击X时的删除事件
                    const anodes = document.querySelectorAll('#wrapper .content .banxin .center .right .rightbuttom .choose .mark a')
                    for (let n = 0; n < anodes.length; n++) {
                        anodes[n].addEventListener('click', function () {
                            //获取点击的a标签身上的index
                            const idx = this.getAttribute('index');

                            //恢复数组中对应下标的值为0
                            arr[idx] = 0;

                            //找到对应的dl中的dd
                            const ddlists = dls[idx].querySelectorAll('dd')
                            //遍历所有的dd 元素，第一个dd元素颜色为红色，其余为基本颜色
                            ddlists.forEach(function (a, b) {
                                ddlists[b].style.color = '#666'
                            })
                            ddlists[0].style.color = 'red'

                            //删除对应位置的mark元素
                            choose.removeChild(this.parentNode)
                            //调用价格函数
                            changepriceBind(arr)
                        })
                    }

                })
            }
        }
    }

    /**
     * 价格变动  函数
     * 点击dd与删除的时候 需要调用
     */
    function changepriceBind(arr) {
        /**
         * 1.获取价格元素
         * 2.每一个dd上设置自定义属性，记录变化的价格
         * 3.遍历arr 数组，将dd元素身上的price价格与已有价格相加
         * 4.将计算之后的结果渲染到p标签之中
         */
        //价格标签函数
        const oldprice = document.querySelector('#wrapper .content .banxin .center .right .rightop .pricewrap .pricetop .price p')
        //原价格
        let price = goodData.goodsDetail.price;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerText) {
                //强制类型转换为数字，方便相加
                let changeprice = Number(arr[i].getAttribute('price'));
                //最终价格
                price += changeprice
            }
        }
        //重新渲染
        oldprice.innerText = price
    }

    /**
     * 封装一个公共选项卡函数
     *被点击的元素---tabbtns
     *被切换显示的元素---tabcontents
     */
    function Tab(tabbtns, tabcontents) {
        for (let i = 0; i < tabbtns.length; i++) {
            // tabbtns[i].index = i;//自定义属性
            tabbtns[i].addEventListener('click', function () {
                for (let j = 0; j < tabbtns.length; j++) {
                    tabbtns[j].className = ''
                    tabcontents[j].className = ''
                }
                this.className = 'active'
                tabcontents[i].className = 'active'
            })
        }
    }

    // 点击左侧选项卡
    lefttab()
    function lefttab() {
        let h4s = document.querySelectorAll('#wrapper .goodsdetailwrap .leftaside .asidetop h4')
        let divs = document.querySelectorAll('#wrapper .goodsdetailwrap .leftaside .asidecontent >div')
        Tab(h4s, divs)
    }

    //点击右侧选项卡
    righttab()
    function righttab() {
        let lis = document.querySelectorAll('#wrapper .goodsdetailwrap .rightdetail .buttomdetail .tabbtns li')
        let divs = document.querySelectorAll('#wrapper .goodsdetailwrap .rightdetail .buttomdetail .tabcontents div')
        Tab(lis, divs)
    }

    // 右边侧边栏的点击效果
    rightasidebind()
    function rightasidebind() {
        //1.找到 点击的 按钮元素
        //2. 记录初始状态 , 发生点击事件进行判断
        //3.设置当前状态的设置按钮及侧边栏的class效果，关闭亦如此
        let flag = true//关闭状态
        //获取元素
        let btn = document.querySelector('#wrapper .rightaside .btns')
        let rightaside = document.querySelector('#wrapper .rightaside')
        //发生点击事件
        btn.addEventListener('click', () => {
            if (flag) {
                btn.className = "btns btnsopen"
                rightaside.className = "rightaside asideopen"
            } else {
                btn.className = "btns btnsclose"
                rightaside.className = "rightaside asideclose"
            }
            flag = !flag
        })

    }

}