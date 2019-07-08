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
    const {isActivitiesUpdated, activities} = this.props.activity

    if (!isActivitiesUpdated) {
      return
    }

    const events = activities.map(
      (activity) => {
        const createdAt = ago(activity.createdAt)
        const action = getAction(activity.type)
        const loginName = activity.actor.login;
        const [repoAuthor, repoName] = activity.repo.name.split('/');
        return (
          <View className='card card-content activity' key={activity.id}>
            <View className='avatar' onClick={this.goToDeveloper.bind(this, loginName)}>
              <AtAvatar image={activity.actor.avatarUrl}/>
            </View>
            <View className='activity-details'>
              <View className='activity-actor-and-action'>
                <View className='text-blue' onClick={this.goToDeveloper.bind(this, activity.actor.login)}>{activity.actor.name}</View>
                <View className='activity-action'>{action}</View>
                <View className='text-blue' onClick={this.goToRepository.bind(this, repoAuthor, repoName)}>{activity.repo.name}</View>
              </View>
              <View className='activity-createdAt text-gray'>{createdAt}</View>
            </View>
          </View>
        )
      }
    )

    return (
      <View className='activities'>
        {events}
      </View>
    )
  }
}

export default ActivityComponent as ComponentClass<PageOwnProps, PageState>
