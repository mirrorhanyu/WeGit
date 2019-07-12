import {ComponentClass} from 'react';
import Taro, {Component, PageConfig} from '@tarojs/taro'
import {Text, View} from "@tarojs/components";
import {connect} from '@tarojs/redux'
import DeveloperContent from '../types/developerContent';
import 'taro-ui/dist/style/index.scss'
import fetchDeveloperContent from "../actions/developer";

import './developer.scss';
import '../common.scss';
import {AtAvatar, AtList, AtListItem} from 'taro-ui'
import isEmptyObject from "../utils/common";
import Loading from "../components/common/loading";

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
    const developer = this.props.developer
    const isDeveloperLoading = isEmptyObject(developer) || !developer.isDeveloperContentUpdated;

    return (
      <View className="developer">
        {isDeveloperLoading && <Loading/>}
        {!isDeveloperLoading && (
          <View>
            <View className="developer-name">
              <AtAvatar image={developer.developerContent.avatar} circle={true}/>
              <Text className="developer-fullname">{developer.developerContent.name}</Text>
              <Text className="developer-nickname">@{developer.developerContent.nickname}</Text>
            </View>

            <View className="developer-info card">
              <View className="developer-bio text-gray">{developer.developerContent.bio}</View>
              <View className="developer-data">
                <View className="developer-repos">
                  <Text>{developer.developerContent.repos}</Text>
                  <Text className="text-gray">Repositories</Text>
                </View>
                <View className="developer-followers">
                  <Text>{developer.developerContent.followers}</Text>
                  <Text className="text-gray">Followers</Text>
                </View>
                <View className="developer-followings">
                  <Text>{developer.developerContent.following}</Text>
                  <Text className="text-gray">Following</Text>
                </View>
              </View>
            </View>

            <View className="developer-contact card">
              <AtList hasBorder={false}>
                <AtListItem title="Email" hasBorder={false} extraText={developer.developerContent.email || '--'}/>
                <AtListItem title="Blog" hasBorder={false} extraText={developer.developerContent.blog || '--'}/>
                <AtListItem title="Company" hasBorder={false} extraText={developer.developerContent.company || '--'}/>
                <AtListItem title="Location" hasBorder={false} extraText={developer.developerContent.location || '--'}/>
              </AtList>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default Developer as ComponentClass<PageOwnProps, PageOwnState>
