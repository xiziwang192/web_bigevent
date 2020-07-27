 $(function() {
     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options)

     //实现上传功能 为上传文件的input设置模拟点击事件
     $('#btnChooseImage').on('click', function() {
         $('#file').click()
     })

     //实现裁剪区域图片的替换
     $('#file').on('change', function(e) {
         var filelist = e.target.files
             //  console.log(filelist);
             //做判断 如果用户没有上传照片 给予提示
         if (filelist.length === 0) {
             return layui.layer.msg('请上传图片')
         }
         //更换裁剪的图片
         //拿到用户选择的图片 
         var file = e.target.files[0]
             //根据选择的文件 创建一个对应的URL地址
         var newImgURL = URL.createObjectURL(file)
         $image
             .cropper('destroy') //先销毁原先的图片
             .attr('src', newImgURL) //重新设置图片路径
             .cropper(options) //重新初始化图片
     })

     //将替换的图片上传到服务器
     $('#btnUpload').on('click', function() {
         //将裁剪后的图片，输出为 base64 格式的字符串
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

         //调用接口 将图片上传到服务器
         $.ajax({
             method: 'POST',
             url: '/my/update/avatar',
             //请求体
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 if (res.status !== 0) {
                     return layui.layer.msg('更新头像失败')
                 }
                 layui.layer.msg('更新头像成功')
                     //初始化主页
                 window.parent.getUserInfo()
             }
         })
     })

 })