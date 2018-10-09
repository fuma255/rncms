import React, { Component } from 'react'
import { Input, Button, Icon, message, notification } from 'antd'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {bindActionCreators} from 'redux'
import {_loading} from '@/reducer/action'
import {_upLoginState} from '@/reducer/action'
import Cookies from 'js-cookie'
import {login} from '@/api'
import './Login.less'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  componentWillMount () {
    this._message()
  }
  _message = () => {
    notification.open({
      message: 'rncms',
      description: '欢迎来到rncms',
    })
  }
  _login = () => {
    const {history, upLoginState} = this.props
    const {username, password} = this.state
    let {loading} = this.props
    if (username === '' || password === '') {
      message.warning('账号和密码不能为空')
      return
    }
    loading(true)
    login({username, password}).then((result) => {
      loading(false)
      if (!result) return
      result = result.data
      Cookies.set('token', result.token)
      Cookies.set('username', username)
      upLoginState(true)
      history.push('/home/index')
    })
  }
  _getUsername = (e) => {
    this.setState({ username: e.target.value })
  }
  _getPassword = (e) => {
    this.setState({ password: e.target.value })
  }
  _handleKeydown = (e) => {
    if (e.which === 13) {
      this._login()
    }
  }
  render() {
    const {intl} = this.props
    let username = intl.formatMessage({id: 'intl.username'},{name: '账号'});
    return (
      <div className="login-box">
        <div className="login-form">
          <div className="login-logo"></div>
          <div className="login-input" onKeyPress={(e)=>{this._handleKeydown(e)}}>
            <Input placeholder={username} 
              prefix={<Icon type="user" />} onChange={this._getUsername}/>
            <Input placeholder="密码" prefix={<Icon type="lock" />} onChange={this._getPassword} />
          </div>
          <div className="login-but">
            <Button type="primary" block onClick={this._login}>登陆</Button>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  upLoginState: bindActionCreators(_upLoginState, dispatch),
  loading: bindActionCreators(_loading, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login))