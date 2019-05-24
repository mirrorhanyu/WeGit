import { ComponentClass } from 'react';
import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import {connect} from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import fetchRepositoryContent from "../actions/repository";
import {IRepositoryContent} from '../models/RepositoryContent';

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

  config = {
    usingComponents: {
      wemark: '../wemark/wemark'
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
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
        <View>{owner}</View>
        <View>{repo}</View>

        <View className='repository-name'>{repositoryContent.name}</View>
        <View className='repository-description'>{repositoryContent.description}</View>
        <View className='repository-watch'>{repositoryContent.subscribers_count}</View>
        <View className='repository-star'>{repositoryContent.stargazers_count}</View>
        <View className='repository-fork'>{repositoryContent.forks}</View>
        <View className='repository-share'>share</View>
        <View className='repository-save'>save</View>
        <View className='repository-copy'>copy</View>

        <View className='repository-author'>{repositoryContent.owner.login}</View>
        <View className='repository-code'>view code</View>
        <View className='repository-license'>{repositoryContent.license.name}</View>
        <View className='repository-issues'>{repositoryContent.open_issues}</View>

        <wemark md={repositoryContent.readme} link='true' baseurl={baseurl} highlight='true' type='wemark' />
      </View>
    )
  }
}

export default Repository as ComponentClass<PageOwnProps, PageOwnState>
