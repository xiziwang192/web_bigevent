// $(function() {
//   // 点击“去注册账号”的链接
//   $('#link_reg').on('click', function() {
//     $('.login-box').hide()
//     $('.reg-box').show()
//   })

//   // 点击“去登录”的链接
//   $('#link_login').on('click', function() {
//     $('.login-box').show()
//     $('.reg-box').hide()
//   })

//   // 从 layui 中获取 form 对象
//   var form = layui.form
//   var layer = layui.layer
//   // 通过 form.verify() 函数自定义校验规则
//   form.verify({
//     // 自定义了一个叫做 pwd 校验规则
//     pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
//     // 校验两次密码是否一致的规则
//     repwd: function(value) {
//       // 通过形参拿到的是确认密码框中的内容
//       // 还需要拿到密码框中的内容
//       // 然后进行一次等于的判断
//       // 如果判断失败,则return一个提示消息即可
//       var pwd = $('.reg-box [name=password]').val()
//       if (pwd !== value) {
//         return '两次密码不一致！'
//       }
//     }
//   })

//   // 监听注册表单的提交事件
//   $('#form_reg').on('submit', function(e) {
//     // 1. 阻止默认的提交行为
//     e.preventDefault()
//     // 2. 发起Ajax的POST请求
//     var data = {
//       username: $('#form_reg [name=username]').val(),
//       password: $('#form_reg [name=password]').val()
//     }
//     $.post('/api/reguser', data, function(res) {
//       if (res.status !== 0) {
//         return layer.msg(res.message)
//       }
//       layer.msg('注册成功，请登录！')
//       // 模拟人的点击行为
//       $('#link_login').click()
//     })
//   })

//   // 监听登录表单的提交事件
//   $('#form_login').submit(function(e) {
//     // 阻止默认提交行为
//     e.preventDefault()
//     $.ajax({
//       url: '/api/login',
//       method: 'POST',
//       // 快速获取表单中的数据
//       data: $(this).serialize(),
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('登录失败！')
//         }
//         layer.msg('登录成功！')
//         // 将登录成功得到的 token 字符串，保存到 localStorage 中
//         localStorage.setItem('token', res.token)
//         // 跳转到后台主页
//         location.href = '/index.html'
//       }
//     })
//   })
// })


// ______________________________________________
//own code
$(function() {
    //实现登录注册页面跳转
    //点击去注册按钮
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //  表单验证
        //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            //进行注册界面的密码校验
            //需要密码框的值等于确认密码框的值
            //给确认密码框设置校验函数 repwd
            //如果两个密码不一样 则返回两次密码输入不一致 
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码输入不一致 请重新输入'
                }
            }
        })
        //监听提交事件
        //监听注册界面提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        //发起ajax请求 因为接口文档中写的是POST请求 所以用post
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);

            }
            layer.msg('注册成功 请登录！');
            //模拟人工点击事件 跳转回登录页面
            $('#link_login').click();
        })

    })

    //监听登录界面提交事件
    $('#form_login').submit(function(e) {
        //阻止表单默认提交行为
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                    //将登陆成功的字符串token 存储到本地localStorage 
                localStorage.setItem('token', res.token)
                    //登录成功以后跳转到后台页面
                location.href = '/index.html'
            }
        })
    })

})