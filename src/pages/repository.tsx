import { ComponentClass } from 'react';
import Taro, {Component, PageConfig} from '@tarojs/taro'
import {View} from "@tarojs/components";
import {connect} from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import fetchRepositoryContent from "../actions/repository";
import {IRepositoryContent} from '../models/RepositoryContent';
import { AtIcon, AtList, AtListItem } from 'taro-ui'

import '../common.scss';
import './repository.scss';

type PageStateProps = {
  repository: {
    repositoryContent: IRepositoryContent,
    isRepositoryContentUpdating: boolean
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

  render() {
    const {repositoryContent} = this.props.repository
    const {owner, repo} = this.state
    const baseurl = 'https://raw.githubusercontent.com/' + owner + '/' + repo + '/master'

    return (
      <View className='repository'>
        <View className='repository-header'>
          <View className='repository-name'>{repositoryContent.name}</View>
          <View className='repository-description card-content'>{repositoryContent.description}</View>
        </View>

        <View className='card text-gray repository-operations'>
          <View className='repository-watch operation'>
            <AtIcon prefixClass='fas' value='eye' size='28'/>
            <View className='repo-watch card-content'>{repositoryContent.subscribers_count}</View>
          </View>
          <View className='repository-star operation'>
            <AtIcon prefixClass='fas' value='star' size='28'/>
            <View className='repo-star card-content'>{repositoryContent.stargazers_count}</View>
          </View>
          <View className='repository-fork operation'>
            <AtIcon prefixClass='fas' value='code-branch' size='28'/>
            <View className='repo-fork card-content'>{repositoryContent.forks}</View>
          </View>
          <View className='repository-share operation'>
            <AtIcon prefixClass='fas' value='code-branch' size='28'/>
            <View className='repo-share card-content'>share</View>
          </View>
          <View className='repository-save operation'>
            <AtIcon prefixClass='fas' value='images' size='28'/>
            <View className='repo-save card-content'>save</View>
          </View>
          <View className='repository-copy operation'>
            <AtIcon prefixClass='fas' value='link' size='28'/>
            <View className='repo-copy card-content'>copy</View>
          </View>
        </View>

        <View className='card card-content'>
          <AtList hasBorder={false}>
            <AtListItem hasBorder={false} title='Author' arrow='right' extraText={repositoryContent.owner.login}/>
            <AtListItem hasBorder={false} title='View Code' arrow='right'/>
            <AtListItem hasBorder={false} title='License' extraText={repositoryContent.owner.login && '--'}/>
          </AtList>
        </View>

        <View className='card card-content'>
          <AtList hasBorder={false}>
            <AtListItem hasBorder={false} title='Issues' arrow='right' extraText={repositoryContent.open_issues.toString()}/>
            <AtListItem hasBorder={false} title='Contributors' arrow='right'/>
          </AtList>
        </View>

        <View className='card card-content'>
          <View className='repository-readme'>
            <AtIcon prefixClass='fas' value='book-reader' size='16'/>
            <View>README.md</View>
          </View>
          <wemark md={repositoryContent.readme} link='true' baseurl={baseurl} highlight='true' type='wemark' />
        </View>

      </View>
    )
  }
}

export default Repository as ComponentClass<PageOwnProps, PageOwnState>
