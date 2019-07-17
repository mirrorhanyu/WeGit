import Taro, {Component} from "@tarojs/taro";

import {View} from "@tarojs/components";

import './loadMore.scss'
import {ComponentClass} from "react";

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  status: string,
  onClick: () => void
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {}

interface LoadMore {
  props: IProps
}

class LoadMore extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      isLoading: false
    }
  }

  render() {
    const { status } = this.props
    const style = (status || '').toLowerCase().replace('_', '-')
    return (
      <View className={style} onClick={this.props.onClick.bind(this)} />
    )
  }
}

export default LoadMore as ComponentClass<PageOwnProps, PageState>


