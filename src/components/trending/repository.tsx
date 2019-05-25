import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'
import { AtIcon } from 'taro-ui';

import {View} from "@tarojs/components";
import {IRepository} from "../../models/repository";

import '../../common.scss'
import './repository.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  repo: IRepository
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
    if (!repo) {
      return
    }

    const heatBars: number[] = [1000, 500, 100, 10, 0];
    const heatIcons: string[] = ['thermometer-full', 'thermometer-three-quarters', 'thermometer-half', 'thermometer-quarter', 'thermometer-empty'];
    const heatIcon = heatIcons[heatBars.findIndex(value => repo.currentPeriodStars > value)]

    return (
      <View className='card' onClick={this.goToRepository.bind(this, repo)}>
        <View className='repo-basic-info'>
          <AtIcon className='repo-icon' prefixClass='fa' value='book' size='18'/>
          <View className='repo-name'>{repo.author}/{repo.name}</View>
        </View>

        <View className='repo-description card-content text-gray'>{repo.description}</View>

        <View className='repo-data card-content text-gray'>
          {
            repo.language && (
              <View className='repo-language'>
                <AtIcon className='repo-icon' prefixClass='fa' value='dot-circle' size='16'/>
                {repo.language}
              </View>
            )
          }
          {
            repo.stars && (
              <View className='repo-stars'>
                <AtIcon className='repo-icon' prefixClass='fa' value='star' size='16'/>
                {repo.stars}
              </View>
            )
          }
          {
            repo.forks && (
              <View className='repo-stars'>
                <AtIcon className='repo-icon' prefixClass='fa' value='code-branch' size='16'/>
                {repo.forks}
              </View>
            )
          }
          {
            repo.currentPeriodStars && (
              <View className='repo-current-period-stars'>
                <AtIcon className='repo-icon' prefixClass='fa' value={heatIcon} size='16'/>
                {repo.currentPeriodStars}
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

export default Repository as ComponentClass<PageOwnProps, PageState>
