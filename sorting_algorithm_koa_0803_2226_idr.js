// 代码生成时间: 2025-08-03 22:26:24
const Koa = require('koa');
const app = new Koa();

// 排序算法实现
function bubbleSort(arr) {
  // 判断输入是否为数组
  if (!Array.isArray(arr)) throw new Error('Input must be an array.');
  
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换元素位置
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 路由处理排序请求
app.use(async ctx => {
  if (ctx.request.method === 'GET') {
    const { array } = ctx.query;
    // 尝试解析数组参数
    try {
      const arr = JSON.parse(array);
      if (!Array.isArray(arr)) {
        throw new Error('Invalid array format.');
      }
      // 执行排序
      const sortedArray = bubbleSort(arr);
      ctx.body = {
        success: true,
        data: sortedArray
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: error.message
      };
    }
  } else {
    ctx.status = 405; // Method Not Allowed
  }
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 代码说明：
// - 使用Koa框架创建一个简单的服务器。
// - 实现一个冒泡排序算法，该算法接受一个数组作为输入，并返回排序后的数组。
// - 通过GET请求访问服务器，并在查询参数中提供待排序的数组（以JSON字符串形式）。
// - 服务器将解析请求中的数组，调用冒泡排序算法，并返回排序结果。
// - 包含错误处理，确保输入格式正确，并对非法输入给出响应。