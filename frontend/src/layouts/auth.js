import { Container } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import AppHeader from '../components/core/AppHeader'
import { httpGet } from '../helpers/http'
import { loadUser, setEditingProduct } from '../reducers/actions/user'

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await httpGet('/users/whoami')

        const { result } = response

        await dispatch(loadUser(result))

        if (params.productId) {
          const editingProduct = result.products.find(
            (_p) => _p.id == params.productId
          )

          await dispatch(setEditingProduct(editingProduct))
        }
      } catch (error) {
        console.log(error)

        localStorage.removeItem('authToken')
        history.push('/landing')
      }
    }

    fetchUser()
  }, [])

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
