import { useCallback, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { fetchPost } from '../../helpers/api'
import { UrlPrefixes, UserType } from '../../helpers/constants'
import Container from './Container'

const Register = ({userType}: {userType: UserType}) => {
    const [errorMsg, setErrorMsg] = useState<string | undefined>()
    const formRef = useRef<{
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        confirmPassword?: string
    }>({})
    const history = useHistory()
    const onSubmit = useCallback(async (event: any) => {
        setErrorMsg('')
        event.preventDefault()
        try {
            const res = await fetchPost(
                UserType.admin,
                userType === UserType.admin ? '/register' : '/user',
                formRef.current
            )
            if (res.data?.error) setErrorMsg(res.data.error)
            if (res.data === true) {
                history.push(`${UrlPrefixes[UserType.admin]}/${userType === UserType.admin ? 'login' : ''}`)
            }
        } catch (e) {
        }
    }, [history])

    return <Container userType={UserType.admin}>
        <div className="w-50 ml-auto mr-auto">
            <Form.Label className="text-center w-100">Register an {userType}</Form.Label>
            <form onSubmit={onSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control
                        type="text"
                        onChange={(e) => {formRef.current!.firstName = e.target.value}}
                        placeholder="First" required/>
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control
                        type="text"
                        onChange={(e) => {formRef.current!.lastName = e.target.value}}
                        placeholder="Last" required/>
                </Form.Group>
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
                <Form.Group controlId="formGroupPassword">
                    <Form.Control
                        type="password"
                        onChange={(e) => {formRef.current!.confirmPassword = e.target.value}}
                        placeholder="Confirm password" required/>
                </Form.Group>
                {errorMsg && <div className="text-danger text-center pb-3">{errorMsg}</div>}
                <Button block type="submit">Submit</Button>
            </form>
        </div>
    </Container>
}

export default Register