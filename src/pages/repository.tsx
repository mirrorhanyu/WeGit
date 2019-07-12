import {ComponentClass} from 'react';
import Taro, {Component, PageConfig} from '@tarojs/taro'
import {Button, View} from "@tarojs/components";
import {connect} from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import fetchRepositoryContent from "../actions/repository";
import {IRepositoryContent} from '../types/RepositoryContent';
import {AtIcon, AtList, AtListItem} from 'taro-ui'

import '../common.scss';
import './repository.scss';
import isEmptyObject from "../utils/common";
import Loading from "../components/common/loading";

type PageStateProps = {
  repository: {
    repositoryContent: IRepositoryContent,
    isRepositoryContentUpdated: boolean
  }
}

type PageDispatchProps = {
  fetchRepositoryContent: (owner, repo) => void
}

type PageOwnProps = {}

type IProps = PageStateProps & PageOwnProps & PageDispatchProps

type PageOwnState = {
  owner: string,
  repo: string
}

type IState = PageOwnState

interface Repository {
  props: IProps,
  state: IState
}

@connect(({repository}) => ({
  repository
}), (dispatch) => ({
  fetchRepositoryContent(owner, repo) {
    dispatch(fetchRepositoryContent(owner, repo))
  }
}))
class Repository extends Component {

  config: PageConfig = {
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#4bbf6b',
    navigationBarTextStyle: 'white'
  }

  componentWillMount() {
    let {owner, repo} = this.$router.params
    this.setState({owner, repo})
    this.props.fetchRepositoryContent(owner, repo)
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onPageScroll(e) {
    let scrollOffset = e.scrollTop;
    Taro.setNavigationBarTitle({
      title: scrollOffset > 0 ? this.state.repo : ''
    })
  }

  onShareAppMessage() {
    return {
      title: `${this.props.repository.repositoryContent.name} from unofficial Github WeChat Mini-Programs`
    }
  }

  copy() {
    Taro.setClipboardData({
      data: `https://github.com/${this.state.owner}/${this.state.repo}`
    });
  }

  render() {
    const repository = this.props.repository

    const isRepositoryLoading = isEmptyObject(repository) || !repository.isRepositoryContentUpdated;

    return (
      <View className='repository'>
        {isRepositoryLoading && <View><Loading/></View>}
        {!isRepositoryLoading && <View>
          <View className='repository-header'>
            <View className='repository-name'>{repository.repositoryContent.name}</View>
            <View className='repository-description card-content'>{repository.repositoryContent.description}</View>
          </View>

          <View className='card text-gray repository-operations'>
            <View className='repository-watch operation'>
              <Button className='text-gray'>
                <AtIcon prefixClass='fas' value='eye' size='28'/>
              </Button>
              <View className='repo-watch card-content'>{repository.repositoryContent.subscribers_count}</View>
            </View>

            <View className='repository-star operation'>
              <Button className='text-gray'>
                <AtIcon prefixClass='fas' value='star' size='28'/>
              </Button>
              <View className='repo-star card-content'>{repository.repositoryContent.stargazers_count}</View>
            </View>

            <View className='repository-fork operation'>
              <Button className='text-gray'>
                <AtIcon prefixClass='fas' value='code-branch' size='28'/>
              </Button>
              <View className='repo-fork card-content'>{repository.repositoryContent.forks}</View>
            </View>

            <View className='repository-share operation'>
              <Button className='text-gray' open-type='share'>
                <AtIcon prefixClass='fas' value='share' size='28'/>
              </Button>
              <View className='repo-share card-content'>share</View>
            </View>

            <View className='repository-save operation'>
              <Button className='text-gray'>
                <AtIcon prefixClass='fas' value='images' size='28'/>
              </Button>
              <View className='repo-save card-content'>save</View>
            </View>

            <View className='repository-copy operation'>
              <Button className='text-gray' onClick={this.copy.bind(this)}>
                <AtIcon prefixClass='fas' value='link' size='28'/>
              </Button>
              <View className='repo-copy card-content'>copy</View>
            </View>
          </View>

          <View className='card card-content'>
            <AtList hasBorder={false}>
              <AtListItem hasBorder={false} title='Author' arrow='right'
                          extraText={repository.repositoryContent.owner.login}/>
              <AtListItem hasBorder={false} title='View Code' arrow='right'/>
              <AtListItem hasBorder={false} title='License'
                          extraText={repository.repositoryContent.owner.login || '--'}/>
            </AtList>
          </View>

          <View className='card card-content'>
            <AtList hasBorder={false}>
              <AtListItem hasBorder={false} title='Issues' arrow='right'
                          extraText={repository.repositoryContent.open_issues.toString()}/>
              <AtListItem hasBorder={false} title='Contributors' arrow='right'/>
            </AtList>
          </View>

          <View className='card card-content'>
            <View className='repository-readme'>
              <AtIcon prefixClass='fas' value='book-reader' size='16'/>
              <View>README.md</View>
            </View>
            <wemark md={repository.repositoryContent.readme}
                    link='true'
                    baseurl={`https://raw.githubusercontent.com/${this.state.owner}/${this.state.repo}/master`}
                    highlight='true'
                    type='wemark'/>
          </View>
        </View>}
      </View>
    )
  }
}

export default Repository as ComponentClass<PageOwnProps, PageOwnState>
