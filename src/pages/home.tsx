import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import {View} from "@tarojs/components";
import { Footer } from '../components/footer'
import { Trending } from '../components/trending'
import { connect } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import { ACTIVITY, TRENDING } from "../constants/tab";

import './home.scss'

type PageStateProps = {
  tab: {
    current: number
  }
}

type PageOwnProps = {}

type PageOwnState = {}

type IProps = PageStateProps & PageOwnProps

interface Home {
  props: IProps,
}

@connect(({ tab }) => ({
  tab
}))
class Home extends Component<PageOwnProps, PageOwnState> {

  config: Config = {
    navigationBarTitleText: 'Trending'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='home'>
        {this.props.tab.current === TRENDING && <Trending /> }
        {this.props.tab.current === ACTIVITY && <View>World</View> }
        <Footer />
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageOwnState>
