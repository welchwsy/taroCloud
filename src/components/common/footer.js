import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { AtTabBar } from 'taro-ui'

export default class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabList: [
        {
          title: '首页',
          iconType: 'home',
          text: 'new',
          router: '/pages/index/index',
        },
        {
          title: '资讯管理',
          iconType: 'bullet-list',
          text: 'new',
          router: '/pages/create/index',
        },
        {
          title: 'Trending',
          iconType: 'analytics',
          text: 'new',
          router: '/pages/trending/index',
          max: 0,
        },
        {
          title: '我的',
          iconType: 'user',
          text: 'new',
          router: '/pages/userCenter/index',
        },
      ],
    }
  }

  handleClick (tabList, value) {
    let { current } = this.props
    const curTab = tabList[value]
    if (curTab.title === '上传图片') {
      this.uploadFile()
    } else if (curTab.router) {
      if (value !== current) {
        this.navigateTo(curTab.router)
      }
    }
  }

  navigateTo (url) {
    Taro.navigateTo({
      url,
    })
  }

  // 选择图片并上传
  uploadFile () {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        Taro.showLoading({
          title: '上传中···',
        })
        const filePath = res.tempFilePaths[0]
        const cloudPath = new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
        Taro.cloud.uploadFile({
          cloudPath,
          filePath, // 文件路径
          success: uploadRes => {
            console.log('[上传文件] 成功：', uploadRes)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            Taro.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            Taro.hideLoading()
          },
        })
      },
    })
  }

  render () {
    const { current } = this.props
    const { tabList } = this.state
    return (
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={this.handleClick.bind(this, tabList)}
        current={current}
      />
    )
  }
}

Footer.propTypes = {
  current: PropTypes.number,
}
