import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import {View} from "@tarojs/components";

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  developer: object
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {}

interface Developer {
  props: IProps
}

class Developer extends Component {

  render() {
    const { developer } = this.props
    return (
      <View>
        <View className='developer-username'>{developer.username}</View>
        <View className='developer-avatar'>{developer.avatar}</View>
        <View className='developer-repo-name'>{developer.repo.name}</View>
        <View className='developer-repo-description'>{developer.repo.description}</View>
        <View className='developer-repo-url'>{developer.repo.url}</View>
      </View>
    )
  }
}

export default Developer as ComponentClass<PageOwnProps, PageState>
