function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    // 设置默认请求头
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...options.headers,
    };

    // 发起请求
    uni.request({
      url: url,
      method: options.method || 'GET',
      data: options.data || {},
      header: headers,
      success: (res) => {
        // 通常我们会根据后端的约定来处理响应，这里假设200为成功状态码
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          // 对于非200状态，根据实际情况处理错误
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });

    // 超时处理
    if (options.timeout) {
      const timeoutId = setTimeout(() => {
        reject(new Error('请求超时'));
        clearTimeout(timeoutId);
      }, options.timeout);
    }
  });
}

export default request;
