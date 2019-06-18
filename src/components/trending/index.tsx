import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import { AtTabs, AtTabsPane } from 'taro-ui'

import {connect} from "@tarojs/redux";
import {View} from "@tarojs/components";
import {fetchDevelopers, fetchRepositories} from "../../actions/trending";
import Repository from "./repository";
import Developer from "./developer";
import {IRepository} from "../../types/repository";
import {IDeveloper} from "../../types/developer";

import './index.scss';

type PageStateProps = {
  trending: {
    isRepositoriesUpdated: boolean,
    isDevelopersUpdated: boolean,
    repositories: IRepository[],
    developers: IDeveloper[]
  }
}

type PageDispatchProps = {
  fetchDevelopers: () => any,
  fetchRepositories: () => any
}

type PageOwnProps = {
  pullDownRefreshAt: number;
}

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

  REPOSITORIES_TAB: number = 0;
  DEVELOPERS_TAB: number = 1;

  constructor () {
    super(...arguments);
    this.state = {
      current: 0,
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pullDownRefreshAt && nextProps.pullDownRefreshAt && this.props.pullDownRefreshAt != nextProps.pullDownRefreshAt) {
      switch (this.state.current) {
        case this.REPOSITORIES_TAB:
          this.props.fetchRepositories();
          break;
        case this.DEVELOPERS_TAB:
          this.props.fetchDevelopers();
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
    if (!this.props.trending.isRepositoriesUpdated) {
      this.props.fetchRepositories()
    }
    if (!this.props.trending.isDevelopersUpdated) {
      this.props.fetchDevelopers()
    }
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
          <AtTabsPane current={this.state.current} index={this.REPOSITORIES_TAB} >
            <View className='repositories'>{repositories}</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={this.DEVELOPERS_TAB}>
            <View className='developers'>{developers}</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Trending as ComponentClass<PageOwnProps, PageState>

