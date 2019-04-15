import {ComponentClass} from "react";
import Taro, {Component} from '@tarojs/taro'

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

type PageState = {}

interface Trending {
  props: IProps
}

@connect(({trending}) => ({
  trending
}), (dispatch) => ({
  fetchData() {
    dispatch(fetchData())
  }
}))
class Trending extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    return (
      <View>
        <View>Trending Page</View>
        <View>{this.props.trending.repositories}</View>
      </View>
    )
  }
}

export default Trending as ComponentClass<PageOwnProps, PageState>

