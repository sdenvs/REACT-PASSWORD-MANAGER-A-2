import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchVal: '',
  }

  ChangesearchVal = event => {
    this.setState({searchVal: event.target.value})
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  formSubmit = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website === '' || username === '' || password === '') {
      alert('input fields required')
    } else {
      this.setState(prev => ({
        passwordList: [
          ...prev.passwordList,
          {
            id: uuidv4(),
            website,
            username,
            password,
            hide: true,
          },
        ],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  deleteItemFun = id => {
    console.log('triggered')
    this.setState(prev => ({
      passwordList: prev.passwordList.filter(eachItem => eachItem.id !== id),
    }))
  }

  showPassword = () => {
    this.setState(prev => ({
      passwordList: prev.passwordList.map(eachItem => ({
        ...eachItem,
        hide: !eachItem.hide,
      })),
    }))
  }

  noPassword = () => (
    <div className="text-center">
      <img
        className="nopassImage mb-3"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <br />
      <p className="showText text-light">No Password</p>
    </div>
  )

  getPassList = passwordList => (
    <ul className="ulLISt text-light d-flex flex-wrap">
      {passwordList.map(eachItem => (
        <PasswordItem
          key={eachItem.id}
          deleteItemFun={this.deleteItemFun}
          details={eachItem}
        />
      ))}
    </ul>
  )

  render() {
    const {passwordList, website, username, password, searchVal} = this.state
    const showPass = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchVal.toLowerCase()),
    )
    return (
      <div className="bgContainer p-3">
        <img
          className="imgLogo mb-3"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
        />
        <div className="card p-4 d-flex flex-md-row mb-3">
          <img
            className="image-1 order-md-2"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
          />

          <form
            onSubmit={this.formSubmit}
            className="p-3 formEl d-flex flex-column"
          >
            <h1 className="text-light h5 mb-4">Add New Password</h1>
            <div className=" mb-4 d-flex align-items-center">
              <img
                className="inputLogo border border-dark bg-light p-1"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
              />
              <input
                onChange={this.changeWebsite}
                value={website}
                placeholder="Enter Website"
                className="input"
                type="text"
              />
            </div>
            <div className=" mb-4 d-flex align-items-center">
              <img
                className="inputLogo border border-dark bg-light p-1"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                value={username}
                onChange={this.changeUsername}
                placeholder="Enter Username"
                className="input"
                type="text"
              />
            </div>
            <div className=" mb-4 d-flex align-items-center">
              <img
                className="inputLogo border border-dark bg-light p-1"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                onChange={this.changePassword}
                value={password}
                placeholder="Enter Password"
                className="input"
                type="text"
              />
            </div>
            <button type="submit" className="btn-lg btn-primary align-self-end">
              Add
            </button>
          </form>
        </div>
        <div className="card p-4">
          <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center mr-2">
              <p className="passText text-light">Your Passwords</p>
              <p className="h5 text-light border border-light count text-center">
                {passwordList.length}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <img
                alt="search"
                className="searchIcon p-1 bg-light border border-dark"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                onChange={this.ChangesearchVal}
                value={searchVal}
                placeholder="Search..."
                className="searchEl bg-light border border-dark"
                type="search"
              />
            </div>
          </div>
          <hr className="border border-light" />
          <div className="d-flex flex-row justify-content-end align-items-center mb-2">
            <input
              onClick={this.showPassword}
              className="inputCheck mr-2"
              type="checkbox"
            />
            <p className="showText text-light">Show Passwords</p>
          </div>
          {passwordList.length === 0
            ? this.noPassword()
            : this.getPassList(showPass)}
        </div>
      </div>
    )
  }
}

export default PasswordManager
