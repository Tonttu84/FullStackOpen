export const getUser = () => {
  const userJSON = window.localStorage.getItem('loggedBlogappUser')

  return userJSON ? JSON.parse(userJSON) : null
}

export const saveUser = (user) => {
  window.localStorage.setItem(
    'loggedBlogappUser',
    JSON.stringify(user)
  )
}

export const removeUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
}