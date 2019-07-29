import Taro, {Component} from "@tarojs/taro";

import {View} from "@tarojs/components";

import './loading.scss'

export default class Loading extends Component {

  componentDidMount() {}

  render() {
    return (
      <View className='loading'>
        <View className='loading-text'>Loading...</View>
      </View>
    )
  }
}
