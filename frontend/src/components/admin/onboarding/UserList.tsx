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
            if (res.data === 'Unauthorized') {
                history.push(`${UrlPrefixes[UserType.admin]}/login`)
                return
            }
            if (res.data?.users) {
                setUsers(res.data.users || [])
            }
        })()
    }, [history])
    return <>
        <div className="pb-2">User management</div>
        <div className="pb-2"><Button>Create User</Button></div>
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
                        ? <tr><td colSpan={3} className="text-center">Empty data</td></tr>
                        : users.map(({_id, firstName, lastName, email}) => <tr key={_id}>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{email}</td>
                            <td>
                                <div className="d-flex">
                                    <Button variant="primary">Edit</Button>
                                    <Button variant="danger" className="ml-1">Remove</Button>
                                </div>
                            </td>
                        </tr>)
                }
            </tbody>
        </Table>
    </>
}

export default UserList
