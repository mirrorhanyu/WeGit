import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import {View} from "@tarojs/components";

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  repo: object
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {}

interface Repository {
  props: IProps
}

class Repository extends Component {

  goToRepository(repo) {
    Taro.navigateTo({
      url: `/pages/repository?owner=${repo.author}&repo=${repo.name}`
    })
  }

  render() {
    const { repo } = this.props
    return (
      <View onClick={this.goToRepository.bind(this, repo)}>
        <View className='repo-name'>{repo.name}</View>
        <View className='repo-author'>{repo.author}</View>
        <View className='repo-description'>{repo.description}</View>
        <View className='repo-language'>{repo.language}</View>
        <View className='repo-stars'>{repo.stars}</View>
        <View className='repo-current-period-stars'>{repo.currentPeriodStars}</View>
      </View>
    )
  }
}

export default Repository as ComponentClass<PageOwnProps, PageState>
