import { useCallback, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { fetchPost, setJwtToken } from '../../helpers/api'
import { UrlPrefixes, UserType } from '../../helpers/constants'
import Container from './Container'

const Login = ({userType}: {userType: UserType}) => {
    const [errorMsg, setErrorMsg] = useState<string | undefined>()
    const history = useHistory()
    const formRef = useRef<{
        email?: string,
        password?: string
    }>({})
    const onSubmit = useCallback(async (event: any) => {
        setErrorMsg('')
        event.preventDefault()
        try {
            const res = await fetchPost(userType, '/login', formRef.current)
            if (res.data?.error) setErrorMsg(res.data.error)
            if (res.data?.token) {
                setJwtToken(userType, res.data.token)
                history.push(UrlPrefixes[userType])
            }
        } catch (e) {
        }
    }, [userType, history])

    return <Container userType={userType}>
        <div className="w-50 ml-auto mr-auto">
            <Form.Label className="text-center w-100">Sign In</Form.Label>
            <form onSubmit={onSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control
                        type="email"
                        onChange={(e) => {formRef.current!.email = e.target.value}}
                        placeholder="Email" required/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control
                        type="password"
                        onChange={(e) => {formRef.current!.password = e.target.value}}
                        placeholder="Password" required/>
                </Form.Group>
                {errorMsg && <div className="text-danger text-center pb-3">{errorMsg}</div>}
                <Button block type="submit">Submit</Button>
            </form>
        </div>
    </Container>
}

export default Login