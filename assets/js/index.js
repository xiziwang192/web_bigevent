$(function() {
        //调用获取用户信息函数
        getUserInfo();
        //实现退出功能
        var layer = layui.layer
        $('#btnlogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                //清楚token
                localStorage.removeItem('token')
                    //确定退出登录后跳转回登录页面
                location.href = '/login.html'
                    //关闭询问框
                layer.close(index);
            });
        })
    })
    //定义获取用户信息的函数 getUserInfo
    //发起ajax请求获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        //判断是否访问成功函数
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        }
    })
}

// 定义renderAvatar函数

function renderAvatar(user) {
    //1.获取用户的用户名
    var name = user.nickname || user.username
        //2.设置欢迎文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.渲染头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }
    //3.2渲染文字头像
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
}