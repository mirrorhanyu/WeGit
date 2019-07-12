import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import {AtTabs, AtTabsPane} from 'taro-ui'

import {connect} from "@tarojs/redux";
import {View} from "@tarojs/components";
import {fetchDevelopers, fetchRepositories} from "../../actions/trending";
import Repository from "./repository";
import Developer from "./developer";
import {IRepository} from "../../types/repository";
import {IDeveloper} from "../../types/developer";

import isEmptyObject from '../../utils/common';

import './index.scss';
import Loading from "../common/loading";

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

  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  componentWillReceiveProps(nextProps) {
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
    Taro.setNavigationBarTitle({title: "Trending"})
    if (!this.props.trending.isRepositoriesUpdated) {
      this.props.fetchRepositories()
    }
    if (!this.props.trending.isDevelopersUpdated) {
      this.props.fetchDevelopers()
    }
  }

  render() {
    const trending = this.props.trending;
    const isRepositoriesLoading = isEmptyObject(trending) || !trending.isRepositoriesUpdated;
    const isDevelopersLoading = isEmptyObject(trending) || !trending.isDevelopersUpdated;

    const tabs = [{title: 'Repositories'}, {title: 'Developers'}]
    const repositories = trending.repositories.map(
      (repo, index) => {
        return (<Repository key={index} repo={repo}/>)
      }
    )
    const developers = trending.developers.map(
      (developer, index) => {
        return (<Developer key={index} developer={developer}/>)
      }
    )
    return (
      <View>
        <AtTabs current={this.state.current} tabList={tabs} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={this.REPOSITORIES_TAB}>
            {isRepositoriesLoading && <Loading/>}
            {!isRepositoriesLoading && <View className='repositories'>{repositories}</View>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={this.DEVELOPERS_TAB}>
            {isDevelopersLoading && <Loading/>}
            {!isDevelopersLoading && <View className='developers'>{developers}</View>}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Trending as ComponentClass<PageOwnProps, PageState>

