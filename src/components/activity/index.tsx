import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import {View} from "@tarojs/components";

import '../../common.scss'
import './index.scss'
import {connect} from "@tarojs/redux";
import fetchActivities from "../../actions/activity";
import Activity from "../../types/activity";

import ago from '../../utils/time';
import getAction from '../../utils/action';
import {AtAvatar} from "taro-ui";
import isEmptyObject from "../../utils/common";
import Loading from "../common/loading";

type PageStateProps = {
  activity: {
    isActivitiesUpdated: boolean,
    activities: Activity[]
  }
}

type PageDispatchProps = {
  fetchActivities: () => any
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {}

interface ActivityComponent {
  props: IProps
}

@connect(({activity}) => ({
  activity
}), (dispatch) => ({
  fetchActivities() {
    dispatch(fetchActivities())
  }
}))
class ActivityComponent extends Component {

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

  componentDidMount() {
    Taro.setNavigationBarTitle({title: "Activity"})
    if (!this.props.activity.isActivitiesUpdated) {
      this.props.fetchActivities()
    }
  }

  render() {
    const activity = this.props.activity;
    const isActivitiesLoading = isEmptyObject(activity) || !activity.isActivitiesUpdated;

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
                <View className='text-blue' onClick={this.goToDeveloper.bind(this, event.actor.login)}>{event.actor.name}</View>
                <View className='activity-action'>{action}</View>
                <View className='text-blue' onClick={this.goToRepository.bind(this, repoAuthor, repoName)}>{event.repo.name}</View>
              </View>
              <View className='activity-createdAt text-gray'>{createdAt}</View>
            </View>
          </View>
        )
      }
    )

    return (
      <View className='activities'>
        {isActivitiesLoading && <Loading/>}
        {!isActivitiesLoading && events}
      </View>
    )
  }
}

export default ActivityComponent as ComponentClass<PageOwnProps, PageState>
