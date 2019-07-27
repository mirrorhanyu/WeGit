import {ComponentClass} from 'react'
import Taro, {Component, PageConfig} from '@tarojs/taro'
import {Input, View} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import loginAndFetchUser from "../actions/login";
import DeveloperContent from "../types/developerContent";
import isEmptyObject from '../utils/common';

import './login.scss'
import '../common.scss'

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
      this.setState({isTokenLengthAcceptable: false})
    } else {
      this.props.loginAndFetchUser(this.state.token)
    }
  }

  handleToken(event) {
    this.setState({
      token: event.target.value,
      isTokenLengthAcceptable: true,
      isTokenValid: true
    })
  }

  generateToken() {
    Taro.setClipboardData({
      data: 'https://github.com/settings/tokens/new?scopes=repo,user&description=WeGit'
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

  render() {
    const {isTokenLengthAcceptable, isTokenValid} = this.state
    return (
      <View className='login'>
        <View className='login-credential'>
          <Input type='text'
                 placeholder='enter your github access token'
                 placeholder-class='login-credential-placeholder'
                 value={this.state.token}
                 onInput={this.handleToken.bind(this)}/>
          {!isTokenLengthAcceptable && <View className='login-error'>access token should contains 40 characters</View>}
          {!isTokenValid && <View className='login-error'>access token is invalid</View>}
          <View className='submit' onClick={this.submit.bind(this)}>Submit</View>
        </View>

        <View className='login-hint'>
          <View className='login-hint-title'>What is Github access tokens</View>
          <View className='login-hint-text'>WeGit uses the GitHub API to retrieve repository metadata. By default, GitHub REST API v3 requests require authentication to prevent the accidental leakage of private repositories to unauthorized users. Personal access tokens function like ordinary OAuth access tokens, they can be used instead of a password for Git over HTTPS, or can be used to authenticate to the API over Basic Authentication</View>
          <View className='login-hint-title'>How to generate Github access tokens</View>
          <View className='login-hint-text'><View className='login-generate-token text-blue' onClick={this.generateToken.bind(this)}>Click here to create one,</View>if you don't already have, then copy and paste it into the token textbox above. Note that the minimal scopes that should be granted are repo and user.</View>
          <View className='login-hint-title'>WeGit doesn't collect, share or care about your data at all. It stores the access token in your wechat local storage and uses it only to communicate with GitHub API, only enter access tokens when you use a trusted device.
          </View>
        </View>
      </View>
    )
  }
}

export default LoginComponent as ComponentClass<PageOwnProps, PageOwnState>
