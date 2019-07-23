import { ComponentClass } from 'react'
import Taro, {Component, PageConfig} from '@tarojs/taro'
import {View} from "@tarojs/components";
import {AtButton, AtForm, AtInput} from 'taro-ui';
import {connect} from "@tarojs/redux";
import loginAndFetchUser from "../actions/login";
import DeveloperContent from "../types/developerContent";
import isEmptyObject from '../utils/common';

type PageStateProps = {
  login: {
    isLoginUpdated: boolean,
    loginInfo: DeveloperContent
  }
}

type PageOwnProps = {}

type PageDispatchProps = {
  loginAndFetchUser: (token) => void
}

type PageOwnState = {}

type IProps = PageStateProps & PageOwnProps & PageDispatchProps

type PageState = {
  token: string,
  isTokenLengthAcceptable: boolean,
  isTokenValid: boolean
}

type IState = PageState

interface LoginComponent {
  props: IProps,
  state: IState
}

@connect(({login}) => ({
  login
}), (dispatch) => ({
  loginAndFetchUser(token) {
    dispatch(loginAndFetchUser(token))
  }
}))
class LoginComponent extends Component<PageOwnProps, PageOwnState> {

  config: PageConfig = {
    navigationBarTitleText: 'Login',
    navigationBarBackgroundColor: '#f1c40f',
    navigationBarTextStyle: 'white'
  }

  constructor() {
    super(...arguments);
    this.state = {
      token: '',
      isTokenLengthAcceptable: true,
      isTokenValid: true
    }
  }

  submit() {
    if (this.state.token.length !== 40) {
      this.setState({isTokenLengthAcceptable : false})
    } else {
      this.props.loginAndFetchUser(this.state.token)
    }
  }

  handleToken(value) {
    this.setState({
      token: value,
      isTokenLengthAcceptable: true,
      isTokenValid: true
    })
  }

  componentWillReceiveProps(nextProps) {
    const login = this.props.login
    const nextLogin = nextProps.login
    if (!login.isLoginUpdated && nextLogin.isLoginUpdated) {
      if (!isEmptyObject(nextLogin.loginInfo)) {
        Taro.navigateBack()
      } else {
        this.setState({isTokenValid: false})
      }
    }
  }

  render () {
    const { isTokenLengthAcceptable, isTokenValid } = this.state
    return (
      <View className='login'>
        <AtForm onSubmit={this.submit.bind(this)}>
          <AtInput
            name='token'
            title='Token'
            type='text'
            value={this.state.token}
            onChange={this.handleToken.bind(this)}
          />
          {!isTokenLengthAcceptable && <View>token should be 40</View>}
          {!isTokenValid && <View>token is invalid</View>}
          <AtButton formType='submit'>Submit</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default LoginComponent as ComponentClass<PageOwnProps, PageOwnState>
