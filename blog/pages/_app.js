import App from 'next/app'
import 'antd/dist/antd.css'
import '../static/style/pages/comm.css'
import Router from "next/router"
import NProgress from "nprogress"
NProgress.configure({
  parent: '#pNprogress'
})
Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()
export default App