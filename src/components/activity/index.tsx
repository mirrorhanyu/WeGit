import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import {View, Text} from "@tarojs/components";

import '../../common.scss'
import './index.scss'
import {connect} from "@tarojs/redux";
import {fetchActivities, loadMoreActivities} from "../../actions/activity";
import Activity from "../../types/activity";

import ago from '../../utils/time';
import getAction from '../../utils/action';
import {AtAvatar} from "taro-ui";
import isEmptyObject from "../../utils/common";
import Loading from "../common/loading";
import LoadMore from "../common/loadMore";

type PageStateProps = {
  activity: {
    isActivitiesUpdated: boolean,
    isLoadingMoreActivitiesUpdated: boolean,
    activities: Activity[],
    maxPagination: string
  }
}

type PageDispatchProps = {
  fetchActivities: (token, username) => any,
  loadMoreActivities: (token, username, page) => any
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {
  currentPagination: number,
  token: string,
  notLogin: false,
  username: string
}

type IState = PageState

interface ActivityComponent {
  props: IProps,
  state: IState
}

@connect(({activity}) => ({
  activity
}), (dispatch) => ({
  fetchActivities(token, username) {
    dispatch(fetchActivities(token, username))
  },
  loadMoreActivities(token, username, page) {
    dispatch(loadMoreActivities(token, username, page))
  }
}))
class ActivityComponent extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      currentPagination: 1,
      token: '',
      notLogin: false,
      username: ''
    }
  }

  getLoadMoreStatus() {
    if (this.props.activity.isLoadingMoreActivitiesUpdated === false) {
      return 'LOADING'
    } else if (this.state.currentPagination < +this.props.activity.maxPagination) {
      return 'LOAD_MORE'
    } else {
      return 'NO_MORE'
    }
  }

  loadMore() {
    this.setState({currentPagination: this.state.currentPagination + 1}, () => {
      this.props.loadMoreActivities(this.state.token, this.state.username, this.state.currentPagination)
    })
  }

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

  componentWillMount() {
    Taro.setNavigationBarTitle({title: "Activity"})
  }

  login() {
    Taro.navigateTo({url: '/pages/login'})
  }

  componentDidMount() {
    this.fetchActivitiesWithToken(() => {
      this.login()
    })
  }

  componentDidShow() {
    this.fetchActivitiesWithToken(() => {
      this.setState({notLogin: true})
    })
  }

  async fetchActivitiesWithToken(onUserNotLogin) {
    try {
      const token: string = (await Taro.getStorage({'key': 'token'})).data
      const username: string = JSON.parse((await Taro.getStorage({'key': 'user'})).data).nickname
      this.setState({token, username}, () => {
        if (!this.props.activity.isActivitiesUpdated) {
          this.props.fetchActivities(token, username)
        }
      })
    } catch (e) {
      onUserNotLogin()
    }
  }

  render() {
    const isNotLogin = this.state.notLogin
    const activity = this.props.activity;
    const isActivitiesLoading = isEmptyObject(activity) || !activity.isActivitiesUpdated;
    const isLoadMoreAvailable = !isEmptyObject(activity) && activity.isActivitiesUpdated;
    const status = this.getLoadMoreStatus()

    const events = (activity.activities || []).map(
      (event) => {
        const createdAt = ago(event.createdAt)
        const action = getAction(event.type)
        const loginName = event.actor.login;
        const [repoAuthor, repoName] = event.repo.name.split('/');
        return (
          <View className='card card-content activity' key={event.id}>
            <View className='avatar' onClick={this.goToDeveloper.bind(this, loginName)}>
              <AtAvatar image={event.actor.avatarUrl}/>
            </View>
            <View className='activity-details'>
              <View className='activity-actor-and-action'>
                <View className='text-blue'
                      onClick={this.goToDeveloper.bind(this, event.actor.login)}>{event.actor.name}</View>
                <View className='activity-action'>{action}</View>
                <View className='text-blue'
                      onClick={this.goToRepository.bind(this, repoAuthor, repoName)}>{event.repo.name}</View>
              </View>
              <View className='activity-createdAt text-gray'>{createdAt}</View>
            </View>
          </View>
        )
      }
    )

    return (
      <View className={isNotLogin ? 'activities-not-login' : 'activities'}>
        {isNotLogin && <Text className='click-to-login' onClick={this.login.bind(this)}>Click me to login</Text>}
        {!isNotLogin && isActivitiesLoading && <Loading/>}
        {!isNotLogin && !isActivitiesLoading && events}
        {!isNotLogin && isLoadMoreAvailable && <LoadMore status={status} onClick={this.loadMore.bind(this)}/>}
      </View>
    )
  }
}

export default ActivityComponent as ComponentClass<PageOwnProps, PageState>
