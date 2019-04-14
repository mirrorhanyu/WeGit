import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import {View} from "@tarojs/components";
import { Footer } from '../../components/footer'
import { connect } from '@tarojs/redux'

import 'taro-ui/dist/style/index.scss'
import './index.scss'
import {ACTIVITY, TRENDING} from "../../constants/tab";

type PageStateProps = {
  tab: {
    current: number
  }
}

type PageOwnProps = {}

type PageOwnState = {}

type IProps = PageStateProps & PageOwnProps

interface Index {
  props: IProps,
}

@connect(({ tab }) => ({
  tab
}))
class Index extends Component {

  config: Config = {
    navigationBarTitleText: 'Home'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {this.props.tab.current === TRENDING && <View>Hello</View> }
        {this.props.tab.current === ACTIVITY && <View>World</View> }
        <Footer />
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageOwnState>
