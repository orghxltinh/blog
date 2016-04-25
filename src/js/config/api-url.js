const apiHost = `${__apiHostName__}:${__apiPort__}`
console.debug('apiHost:', apiHost);
window.hxltinh = window.hxltinh || {};
window.hxltinh.apiUrl = {};
window.hxltinh.apiUrl.blogs = `${apiHost}/api/blogs`
window.hxltinh.apiUrl.users = `${apiHost}/api/users`
window.hxltinh.apiUrl.articles = `${apiHost}/api/articles`
