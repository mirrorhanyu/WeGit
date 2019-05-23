import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import { AtTabs, AtTabsPane } from 'taro-ui'

import {connect} from "@tarojs/redux";
import {View} from "@tarojs/components";
import {fetchDevelopers, fetchRepositories} from "../../actions/trending";
import Repository from "./repository";
import Developer from "./developer";
import {IRepository} from "../../models/repository";
import {IDeveloper} from "../../models/developer";

type PageStateProps = {
  trending: {
    isRepositoriesUpdating: boolean,
    isDevelopersUpdating: boolean,
    repositories: IRepository[],
    developers: IDeveloper[]
  }
}

type PageDispatchProps = {
  fetchDevelopers: () => any,
  fetchRepositories: () => any
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {
  current: number
}

type IState = PageState

interface Trending {
  props: IProps,
  state: IState
}

@connect(({trending}) => ({
  trending
}), (dispatch) => ({
  fetchDevelopers() {
    dispatch(fetchDevelopers())
  },
  fetchRepositories() {
    dispatch(fetchRepositories())
  }
}))
class Trending extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentDidMount() {
    this.props.fetchDevelopers()
    this.props.fetchRepositories()
  }

  render() {
    const tabs = [{ title: 'Repositories' }, { title: 'Developers' }]
    const repositories = this.props.trending.repositories.map(
      (repo, index) => {
        return (<Repository key={index} repo={repo}/>)
      }
    )
    const developers = this.props.trending.developers.map(
      (developer, index) => {
        return (<Developer key={index} developer={developer}/>)
      }
    )
    return (
      <View>
        <AtTabs current={this.state.current} tabList={tabs} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            {repositories}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {developers}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Trending as ComponentClass<PageOwnProps, PageState>

