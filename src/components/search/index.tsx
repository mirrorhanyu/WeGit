import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import {View} from "@tarojs/components";

import '../../common.scss'
import './index.scss'
import {connect} from "@tarojs/redux";
import {searchRepositories, loadMoreRepositories} from "../../actions/search";

import ago from '../../utils/time';
import {AtIcon, AtSearchBar} from "taro-ui";
import Search from "../../types/search";
import isEmptyObject from "../../utils/common";
import Loading from "../common/loading";
import LoadMore from "../common/loadMore";

type PageStateProps = {
  search: {
    isSearchedRepositoriesUpdated: boolean,
    isLoadingMoreRepositoriesUpdated: boolean,
    searchedRepositories: Search[],
    searchedRepo: string,
    maxPagination: number,
    currentPagination: number
  }
}

type PageDispatchProps = {
  searchRepositories: (name) => any,
  loadMoreRepositories: (name, page) => any
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

type PageState = {
  searchedRepo: string,
  currentPagination: number
}

type IState = PageState

interface SearchComponent {
  props: IProps,
  state: IState
}

@connect(({search}) => ({
  search
}), (dispatch) => ({
  searchRepositories(name) {
    dispatch(searchRepositories(name))
  },
  loadMoreRepositories(name, page) {
    dispatch(loadMoreRepositories(name, page))
  }
}))
class SearchComponent extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      searchedRepo: this.props.search.searchedRepo || '',
      currentPagination: this.props.search.currentPagination || 1
    }
  }

  goToRepository(author, name) {
    Taro.navigateTo({url: `/pages/repository?owner=${author}&repo=${name}`})
  }

  loadMore() {
    this.setState({currentPagination: this.state.currentPagination + 1}, () => {
      this.props.loadMoreRepositories(this.state.searchedRepo || this.props.search.searchedRepo, this.state.currentPagination)
    })
  }

  getLoadMoreStatus() {
    if (this.props.search.isLoadingMoreRepositoriesUpdated === false) {
      return 'LOADING'
    } else if (this.state.currentPagination < this.props.search.maxPagination) {
      return 'LOAD_MORE'
    } else {
      return 'NO_MORE'
    }
  }

  onChange(value) {
    this.setState({searchedRepo: value})
  }

  onActionClick() {
    const search = this.state.searchedRepo;
    if (search) {
      this.props.searchRepositories(search);
    }
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({title: 'Search'})
  }

  render() {
    const search = this.props.search;
    const isSearchedRepositoriesLoading = !isEmptyObject(search) && !search.isSearchedRepositoriesUpdated;
    const isLoadMoreAvailable = !isEmptyObject(search) && search.isSearchedRepositoriesUpdated;
    const status = this.getLoadMoreStatus()
    const searchRepositories = (search.searchedRepositories || []).map(
      (repo) => {
        const updatedAt = ago(repo.updatedAt)
        return (
          <View className='card card-content search-repository' key={repo.id}
                onClick={this.goToRepository.bind(this, repo.owner.name, repo.name)}>

            <View className='search-repository-basic-info'>
              <AtIcon prefixClass='fas' value='book' size='18'/>
              <View>{repo.owner.name}/{repo.name}</View>
            </View>

            <View className='search-repository-description text-gray'>{repo.description}</View>

            <View className='search-repositories-data text-gray'>
              {
                repo.language && (
                  <View className='search-repository-language'>
                    <AtIcon className='repo-icon' prefixClass='fas' value='dot-circle' size='16'/>
                    {repo.language}
                  </View>
                )
              }
              {
                repo.stars && (
                  <View className='search-repository-stars'>
                    <AtIcon className='repo-icon' prefixClass='fas' value='star' size='16'/>
                    {repo.stars}
                  </View>
                )
              }
            </View>

            <View className='search-repository-at text-gray'>Updated at {updatedAt}</View>
          </View>
        )
      }
    )

    return (
      <View className='search-repositories'>
        <AtSearchBar
          fixed
          showActionButton
          placeholder='search'
          actionName='search'
          value={this.state.searchedRepo}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <View className='search-repositories-list'>
          {isSearchedRepositoriesLoading && <Loading/>}
          {!isSearchedRepositoriesLoading && searchRepositories}
          {isLoadMoreAvailable && <LoadMore status={status} onClick={this.loadMore.bind(this)}/>}
        </View>
      </View>
    )
  }
}

export default SearchComponent as ComponentClass<PageOwnProps, PageState>
