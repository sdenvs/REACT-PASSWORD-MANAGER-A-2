import './index.css'

const PasswordItem = props => {
  const {details, deleteItemFun} = props
  const {website, username, password, id, hide} = details
  const deleteItem = () => {
    deleteItemFun(id)
  }
  return (
    <li className="border border-light passItem p-3 d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex align-items-center">
        <div className="mr-2 passItemIcon bg-success text-light rounded-circle text-center">
          {website[0]}
        </div>
        <div className="mr-2">
          <p className="par-1">{website}</p>
          <p className="par-2">{username}</p>
          {hide ? (
            <img
              className="pass-star"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            />
          ) : (
            <p className="par-2">{password}</p>
          )}
        </div>
      </div>
      <button
        testid="delete"
        onClick={deleteItem}
        className="bg-transparent border-0"
      >
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default PasswordItem
