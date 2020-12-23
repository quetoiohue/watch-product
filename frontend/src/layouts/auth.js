import { Container } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AppHeader from '../components/core/AppHeader'
import { displayModal } from '../reducers/actions/modal'
import { loadNotifications } from '../reducers/actions/notification'
import { loadUser, setEditingProduct } from '../reducers/actions/user'

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch()
  const params = useParams()

  React.useEffect(() => {
    async function fetchUser() {
      try {
        displayModal('spinner-loading')

        const response = await Promise.allSettled([
          loadUser(),
          loadNotifications()
        ])

        const [user] = response

        if (params.productId) {
          const { products } = user?.value
          const editingProduct = products?.find(
            _p => _p.id === Number(params.productId)
          )

          dispatch(setEditingProduct(editingProduct))
        }
      } catch (error) {
        localStorage.removeItem('authToken')
        window.location.href = '/landing'
      } finally {
        setTimeout(() => {
          displayModal(null)
        }, 1000)
      }
    }

    fetchUser()
  }, [params, dispatch])

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
