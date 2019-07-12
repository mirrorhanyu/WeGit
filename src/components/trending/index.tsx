import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import {AtTabs, AtTabsPane} from 'taro-ui'

import {connect} from "@tarojs/redux";
import {View, Picker} from "@tarojs/components";
import {fetchDevelopers, fetchRepositories, fetchLanguages} from "../../actions/trending";
import Repository from "./repository";
import Developer from "./developer";
import {IRepository} from "../../types/repository";
import DeveloperType from "../../types/developer";

import isEmptyObject from '../../utils/common';

import './index.scss';
import Loading from "../common/loading";

type PageStateProps = {
  trending: {
    isRepositoriesUpdated: boolean,
    isDevelopersUpdated: boolean,
    isLanguagesUpdated: boolean,
    repositories: IRepository[],
    developers: DeveloperType[],
    languages: string[]
  }
}

type PageDispatchProps = {
  fetchDevelopers: (since, language) => any,
  fetchRepositories: (since, language) => any,
  fetchLanguages: () => any
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
  fetchDevelopers(since, language) {
    dispatch(fetchDevelopers(since, language))
  },
  fetchRepositories(since, language) {
    dispatch(fetchRepositories(since, language))
  },
  fetchLanguages() {
    dispatch(fetchLanguages())
  }
}))
class Trending extends Component {

  REPOSITORIES_TAB: number = 0;
  DEVELOPERS_TAB: number = 1;

  timeRanges = ['Daily', 'Weekly', 'Monthly']

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

  filter(event) {
    const since = this.timeRanges[event.detail.value[0]].toLowerCase();
    const language = this.props.trending.languages[event.detail.value[1]].toLowerCase();
    this.props.fetchDevelopers(since, language)
    this.props.fetchRepositories(since, language)
  }

  componentWillReceiveProps(nextProps) {
    const defaultSince = this.timeRanges[0].toLowerCase();
    if (!this.props.trending.isLanguagesUpdated && nextProps.trending.isLanguagesUpdated) {
      this.props.fetchRepositories(defaultSince, nextProps.trending.languages[0].toLowerCase())
      this.props.fetchDevelopers(defaultSince, nextProps.trending.languages[0].toLowerCase())
    }

    if (this.props.pullDownRefreshAt && nextProps.pullDownRefreshAt && this.props.pullDownRefreshAt != nextProps.pullDownRefreshAt) {
      switch (this.state.current) {
        case this.REPOSITORIES_TAB:
          break;
        case this.DEVELOPERS_TAB:
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({title: "Trending"})
    if (!this.props.trending.isLanguagesUpdated) {
      this.props.fetchLanguages()
    }
  }

  render() {
    const trending = this.props.trending;
    const isRepositoriesLoading = isEmptyObject(trending) || !trending.isRepositoriesUpdated;
    const isDevelopersLoading = isEmptyObject(trending) || !trending.isDevelopersUpdated;
    const isLanguagesLoading = isEmptyObject(trending) || !trending.isLanguagesUpdated;

    const tabs = [{title: 'Repositories'}, {title: 'Developers'}]
    const repositories = (trending.repositories || []).map(
      (repo, index) => {
        return (<Repository key={index} repo={repo}/>)
      }
    )
    const developers = (trending.developers || []).map(
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
        {!isLanguagesLoading && <View className='trending-filter'>
          <Picker mode='multiSelector'
                  range={[this.timeRanges, this.props.trending.languages]}
                  value={[0, 0]}
                  onChange={this.filter.bind(this)}>
            <View className='trending-filter-plus picker'/>
          </Picker>
        </View>}
      </View>
    )
  }
}

export default Trending as ComponentClass<PageOwnProps, PageState>

