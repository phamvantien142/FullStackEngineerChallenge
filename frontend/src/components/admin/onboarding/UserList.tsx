import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { fetchGet } from '../../../helpers/api'
import { UrlPrefixes, UserType } from '../../../helpers/constants'

const UserList = () => {
    const [users, setUsers] = useState([])
    const history = useHistory()
    useEffect(() => {
        (async () => {
            const res = await fetchGet(UserType.admin, '/users')
            if (res.data === 'Unauthorized' || res.data.error === 'Invalid token') {
                history.push(`${UrlPrefixes[UserType.admin]}/login`)
                return
            }
            if (res.data?.users) {
                setUsers(res.data.users || [])
            }
        })()
    }, [history])
    const edit = (id: string) => {
        // TODO: go to review edit form
    }
    const remove = (id: string) => {
        // TODO: send the delete API to remove this review
    }
    return <>
        <div className="pb-2">User management</div>
        <div className="pb-2">
            <Button onClick={() => history.push(`${UrlPrefixes[UserType.admin]}/new-user`)}>
                Create User
            </Button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    !users.length
                        ? <tr><td colSpan={4} className="text-center">Empty data</td></tr>
                        : users.map(({_id, firstName, lastName, email}) => <tr key={_id}>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{email}</td>
                            <td>
                                <div className="d-flex">
                                    <Button variant="primary" onClick={() => edit(_id)}>Edit</Button>
                                    <Button variant="danger" onClick={() => remove(_id)} className="ml-1">Remove</Button>
                                </div>
                            </td>
                        </tr>)
                }
            </tbody>
        </Table>
    </>
}

export default UserList
