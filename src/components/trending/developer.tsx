import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'
import { AtAvatar, AtIcon } from 'taro-ui'

import {View} from "@tarojs/components";
import DeveloperType from "../../types/developer";

import '../../common.scss'
import './developer.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  developer: DeveloperType
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {}

interface Developer {
  props: IProps
}

class Developer extends Component {

  goToRepository(author, name, event) {
    event.stopPropagation()
    Taro.navigateTo({
      url: `/pages/repository?owner=${author}&repo=${name}`
    })
  }

  goToDeveloper(name) {
    Taro.navigateTo({
      url: `/pages/developer?name=${name}`
    })
  }

  render() {
    const { developer } = this.props
    return (
      <View className='card developer' onClick={this.goToDeveloper.bind(this, developer.username)}>
        <View className='developer-avatar' >
          <AtAvatar image={developer.avatar}/>
        </View>

        <View className='developer-info'>
          <View className='developer-username'>{developer.username}</View>

          <View className='developer-repo-name'>
            <AtIcon className='repo-icon' prefixClass='fas' value='book' size='16'/>
            <View className='repo-name text-blue' onClick={this.goToRepository.bind(this, developer.username, developer.repo.name)}>{developer.repo.name}</View>
          </View>

          <View className='developer-repo-description text-gray card-content'>{developer.repo.description}</View>
        </View>
      </View>
    )
  }
}

export default Developer as ComponentClass<PageOwnProps, PageState>
