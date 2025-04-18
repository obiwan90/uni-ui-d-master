import  request  from "@/utils/request.js";

function createApiRequest(baseURL, defaultOptions = {}) {
  return async function(path, options = {}) {
    const url = `${baseURL}${path}`;
    const headers = {
      // 'X-API-KEY': 'your-api-key-here', // 如果你有API密钥，请在这里设置
      ...defaultOptions.headers, // 使用默认headers
      ...options.headers, // 允许每次请求覆盖headers
    };

    // 请求拦截器逻辑
    const requestInterceptor = (url, options) => {
      // 在这里可以添加请求前的逻辑，如添加token等
      console.log(`Requesting: ${url}`, options);
      return { url, options };
    };

    // 响应拦截器逻辑
    const responseInterceptor = (response) => {
      // 在这里可以添加处理响应的逻辑
      console.log(`Response from: ${url}`, response);
      return response;
    };

    // 调用请求拦截器
    const { url: finalUrl, options: finalOptions } = requestInterceptor(url, { ...defaultOptions, ...options, headers });

    try {
      const response = await request(finalUrl, finalOptions);
      // 调用响应拦截器
      return responseInterceptor(response);
    } catch (error) {
      console.error(`Request to ${url} failed: `, error);
      throw error; // 重新抛出错误，以便调用者可以捕获
    }
  };
}

export default createApiRequest;
