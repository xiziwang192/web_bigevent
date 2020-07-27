$(function() {
    var form = layui.form
    var layer = layui.layer
        //设置表单验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    InitUserInfo();
    //初始化用户的基本信息
    function InitUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //调用form val()方法为表单赋值
                form.val('formUserInfo', res.data);
            }

        })
    }

    //重置表单内容
    //表单最原本的内容就是我们初始化表单获取的内容 所以给重置按钮设置点击事件 然后调用初始化函数
    $('#btnReset').on('click', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        InitUserInfo();

    })

    //更新用户的基本信息
    //监听表单的提交事件
    $('.layui-form').submit(function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg(res.message)
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }

        })
    })

})