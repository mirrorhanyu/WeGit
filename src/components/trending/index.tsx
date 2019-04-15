import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

import { AtTabs, AtTabsPane } from 'taro-ui'

import {connect} from "@tarojs/redux";
import {View} from "@tarojs/components";
import {fetchData} from "../../actions/trending";

type PageStateProps = {
  trending: {
    isRepositoriesUpdating: boolean,
    isDevelopersUpdating: boolean,
    repositories: string[],
    developers: string[]
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
      </View>
    )
  }
}

export default Trending as ComponentClass<PageOwnProps, PageState>

