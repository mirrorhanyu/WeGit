import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'
import {AtTabBar} from 'taro-ui'

import {connect} from "@tarojs/redux";
import {switchTab} from "../../actions/tab";

type PageStateProps = {
  tab: {
    current: number
  }
}

type PageDispatchProps = {
  switchTab: (tab) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {}

interface Footer {
  props: IProps
}

@connect(({tab}) => ({
  tab
}), (dispatch) => ({
  switchTab(tab) {
    dispatch(switchTab(tab))
  }
}))
class Footer extends Component {
  render() {
    return (
      <AtTabBar
        fixed
        tabList={[
          {title: 'Trending', iconType: 'bullet-list'},
          {title: 'Activity', iconType: 'camera'},
        ]}
        onClick={this.props.switchTab}
        current={this.props.tab.current}
      />
    )
  }
}

export default Footer as ComponentClass<PageOwnProps, PageState>

