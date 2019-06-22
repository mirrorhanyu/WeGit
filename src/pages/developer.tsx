import {ComponentClass} from 'react';
import Taro, {Component, PageConfig} from '@tarojs/taro'
import {View, Text} from "@tarojs/components";
import {connect} from '@tarojs/redux'
import DeveloperContent from '../types/developerContent';
import 'taro-ui/dist/style/index.scss'
import fetchDeveloperContent from "../actions/developer";

import './developer.scss';
import '../common.scss';
import { AtAvatar, AtList, AtListItem } from 'taro-ui'

type PageStateProps = {
  developer: {
    developerContent: DeveloperContent,
    isDeveloperContentUpdated: boolean
  }
}

type PageDispatchProps = {
  fetchDeveloperContent: (owner) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageOwnProps & PageDispatchProps

type PageOwnState = {
  owner: string
}

type IState = PageOwnState

interface Developer {
  props: IProps,
  state: IState
}

@connect(({developer}) => ({
  developer
}), (dispatch) => ({
  fetchDeveloperContent(owner) {
    dispatch(fetchDeveloperContent(owner))
  }
}))
class Developer extends Component {

  config: PageConfig = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#a29bfe',
    navigationBarTextStyle: 'white'
  }

  componentWillMount() {
    let {name} = this.$router.params
    this.setState({name})
    this.props.fetchDeveloperContent(name)
  }

  render() {
    const {developerContent, isDeveloperContentUpdated} = this.props.developer

    if (!isDeveloperContentUpdated) {
      return;
    }

    return (
      <View className="developer">
        <View className="developer-name">
          <AtAvatar image={developerContent.avatar} circle={true} />
          <Text className="developer-fullname">{developerContent.name}</Text>
          <Text className="developer-nickname">@{developerContent.nickname}</Text>
        </View>

        <View className="developer-info card">
          <View className="developer-bio text-gray">{developerContent.bio}</View>
          <View className="developer-data">
            <View className="developer-repos">
              <Text>{developerContent.repos}</Text>
              <Text className="text-gray">Repositories</Text>
            </View>
            <View className="developer-followers">
              <Text>{developerContent.followers}</Text>
              <Text className="text-gray">Followers</Text>
            </View>
            <View className="developer-followings">
              <Text>{developerContent.following}</Text>
              <Text className="text-gray">Following</Text>
            </View>
          </View>
        </View>

        <View className="developer-contact card">
          <AtList hasBorder={false}>
            <AtListItem title="Email" hasBorder={false} extraText={developerContent.email || '--'} />
            <AtListItem title="Blog" hasBorder={false} extraText={developerContent.blog || '--'} />
            <AtListItem title="Company" hasBorder={false} extraText={developerContent.company || '--'} />
            <AtListItem title="Location" hasBorder={false} extraText={developerContent.location || '--'} />
          </AtList>
        </View>
      </View>
    )
  }
}

export default Developer as ComponentClass<PageOwnProps, PageOwnState>
