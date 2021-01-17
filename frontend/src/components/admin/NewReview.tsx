import { useCallback, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { fetchPost } from '../../helpers/api'
import { UrlPrefixes, UserType } from '../../helpers/constants'
import Container from '../common/Container'

const NewReview = () => {
    const [errorMsg, setErrorMsg] = useState<string | undefined>()
    const formRef = useRef<{
        title?: string,
        email?: string,
    }>({})
    const history = useHistory()
    const onSubmit = useCallback(async (event: any) => {
        setErrorMsg('')
        event.preventDefault()
        try {
            const res = await fetchPost(
                UserType.admin,
                '/review',
                formRef.current
            )
            if (res.data?.error) setErrorMsg(res.data.error)
            if (res.data === true) {
                history.push(UrlPrefixes[UserType.admin])
            }
        } catch (e) {
        }
    }, [history])

    return <Container userType={UserType.admin}>
        <div className="w-50 ml-auto mr-auto">
            <Form.Label className="text-center w-100">Create a new review</Form.Label>
            <form onSubmit={onSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control
                        type="text"
                        onChange={(e) => {formRef.current!.title = e.target.value}}
                        placeholder="Title" required/>
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control
                        type="email"
                        onChange={(e) => {formRef.current!.email = e.target.value}}
                        placeholder="Email" required/>
                </Form.Group>
                {errorMsg && <div className="text-danger text-center pb-3">{errorMsg}</div>}
                <Button block type="submit">Submit</Button>
            </form>
        </div>
    </Container>
}

export default NewReview