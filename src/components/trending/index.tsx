import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import { AtTabs, AtTabsPane } from 'taro-ui'

import {connect} from "@tarojs/redux";
import {View} from "@tarojs/components";
import {fetchData} from "../../actions/trending";
import Repository from "./repository";

type PageStateProps = {
  trending: {
    isRepositoriesUpdating: boolean,
    isDevelopersUpdating: boolean,
    repositories: object[],
    developers: object[]
  }
}

type PageDispatchProps = {
  fetchData: () => any
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
  fetchData() {
    dispatch(fetchData())
  }
}))
class Trending extends Component {
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const tabs = [{ title: 'Repositories' }, { title: 'Developers' }]
    const repositories = this.props.trending.repositories.map(
      (repo) => {
        return (<Repository repo={repo}/>)
      }
    )
    return (
      <View>
        <AtTabs current={this.state.current} tabList={tabs} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View>Repositories</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View>Developers</View>
          </AtTabsPane>
        </AtTabs>
        {repositories}
      </View>
    )
  }
}

export default Trending as ComponentClass<PageOwnProps, PageState>

