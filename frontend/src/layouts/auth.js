import { Container } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import AppHeader from '../components/core/AppHeader'
import { httpGet } from '../helpers/http'
import { displayModal } from '../reducers/actions/modal'
import { loadNotifications } from '../reducers/actions/notification'
import { loadUser, setEditingProduct } from '../reducers/actions/user'

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  React.useEffect(() => {
    async function fetchUser() {
      try {
        await displayModal('spinner-loading')

        const response = await Promise.allSettled([
          loadUser(),
          loadNotifications(),
        ])
        console.log('response>>>>>>>>', response)

        const [user, notifications] = response

        if (params.productId) {
          const { products } = user?.value
          const editingProduct = products?.find(
            (_p) => _p.id == params.productId
          )

          dispatch(setEditingProduct(editingProduct))
        }
      } catch (error) {
        console.log(error)

        localStorage.removeItem('authToken')
        window.location.href = '/landing'
      }
    }

    fetchUser()
  }, [params])

  return (
    <React.Fragment>
      <AuthLayoutContainer className="auth-layout flex-col mh-100v">
        <AppHeader className="flex-none flex" />
        <main className="main-layout flex-1">
          <Container>{children}</Container>
        </main>
      </AuthLayoutContainer>
    </React.Fragment>
  )
}

export default AuthLayout

const AuthLayoutContainer = styled.div`
  .main-layout {
    padding: 80px 0px;
  }
`
