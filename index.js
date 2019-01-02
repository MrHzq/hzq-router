/*
 * @Author: hzq
 * @Date: 2018-12-12 10:10:19
 * @Last Modified by: hzq
 * @Last Modified time: 2019-01-02 10:43:06
 * @文件说明: 所有路由处理
 * key：为views下面的【文件夹】名称
 * []：为对应key下面的【.vue文件】名称
 */

export default ({ rc, meta = {}, redirect = '', rootFile = 'views' }) => {
    let Routers = []
    rc.keys().map(fileName => {
        let name = ''
        let len = fileName.match(/\//g).length
        // 当len===1：开始处理views根目录的.vue
        if (len === 1) {
            // 获取.vue文件名称，用于当作 path 的值
            name = fileName.substr(2).split('.vue')[0]
            let obj = {
                name,
                path: '/' + name,
                component: () => import('@/' + rootFile + fileName.substr(1))
            }
            // 是否需要路由元
            if (meta[name]) obj.meta = meta[name]
            Routers.push(obj)
        } else if (len === 2) {
            // 当len===2：开始处理views非根目录的.vue
            // 获取文件夹名称
            name = fileName.split(/\//g)[1]
            // 获取.vue文件名称，用于当作 path 的值
            let cname = fileName.split(/\//g)[2].split('.')[0]
            let rObj = Routers.find(r => r.name === name)
            if (rObj) {
                // 是 子路由 文件夹，则将数据放入 children
                let obj = {
                    name: cname,
                    path: cname,
                    component: () =>
                        import('@/' + rootFile + fileName.substr(1))
                }
                if (Array.isArray(rObj.children)) {
                    rObj.children.push(obj)
                } else {
                    rObj.children = [obj]
                }
            } else {
                let obj = {
                    name: cname,
                    path: '/' + cname,
                    component: () =>
                        import('@/' + rootFile + fileName.substr(1))
                }
                // 是否需要路由元
                if (meta[name]) obj.meta = meta[name]
                Routers.push(obj)
            }
        }
    })
    if (redirect) Routers.unshift({ path: '/', redirect })
    return Routers
}
