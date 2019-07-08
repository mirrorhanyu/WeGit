import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import {View} from "@tarojs/components";
import { Footer } from '../components/footer'
import { Trending } from '../components/trending'
import { ActivityComponent } from '../components/activity'
import { connect } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import { ACTIVITY, TRENDING, SEARCH } from "../constants/tab";

import './home.scss'

type PageStateProps = {
  tab: {
    current: number
  }
}

type PageOwnProps = {}

type PageOwnState = {}

type IProps = PageStateProps & PageOwnProps

type PageState = {
  trendingPullDownRefreshAt: number
}

type IState = PageState

interface Home {
  props: IProps,
  state: IState
}

@connect(({ tab }) => ({
  tab
}))
class Home extends Component<PageOwnProps, PageOwnState> {

  allowPullDownRefreshAfter: number;

  config: Config = {
    enablePullDownRefresh: true
  }

  constructor() {
    super(...arguments);
    this.state.trendingPullDownRefreshAt = new Date().getTime();
    this.allowPullDownRefreshAfter = 5000;
  }

  onPullDownRefresh() {
    switch (this.props.tab.current) {
      case TRENDING:
        let now: number = new Date().getTime();
        if (now - this.state.trendingPullDownRefreshAt > this.allowPullDownRefreshAfter) {
          this.setState({trendingPullDownRefreshAt: now})
        }
        break;
      case ACTIVITY:
        break;
      case SEARCH:
        break;
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='home'>
        {this.props.tab.current === TRENDING && <Trending pullDownRefreshAt={this.state.trendingPullDownRefreshAt} /> }
        {this.props.tab.current === ACTIVITY && <ActivityComponent /> }
        {this.props.tab.current === SEARCH && <View>search</View> }
        <Footer />
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageOwnState>
