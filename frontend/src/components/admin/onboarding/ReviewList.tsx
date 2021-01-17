import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { fetchGet } from '../../../helpers/api'
import { UrlPrefixes, UserType } from '../../../helpers/constants'

const ReviewList = () => {
    const [reviews, setReviews] = useState([])
    const history = useHistory()
    useEffect(() => {
        (async () => {
            const res = await fetchGet(UserType.admin, '/reviews')
            if (res.data?.reviews) {
                setReviews(res.data.reviews || [])
            }
        })()
    }, [])
    const edit = (id: string) => {
        // TODO: go to review edit form
    }
    const remove = (id: string) => {
        // TODO: send the delete API to remove this review
    }
    return <>
        <div className="pb-2">Review management</div>
        <div className="pb-2">
            <Button onClick={() => history.push(`${UrlPrefixes[UserType.admin]}/new-review`)}>
                Create Review
            </Button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Reviewee</th>
                    <th>Stars</th>
                    <th>Reviewers</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    !reviews.length
                        ? <tr><td colSpan={5} className="text-center">Empty data</td></tr>
                        : reviews.map(({_id, title, reviewee: {email}, totalStars, totalFeedbacks}) => <tr key={_id}>
                            <td>{title}</td>
                            <td>{email}</td>
                            <td>{totalStars}</td>
                            <td>{totalFeedbacks}</td>
                            <td>
                                <div className="d-flex">
                                    <Button variant="primary" onClick={() => edit(_id)}>Edit</Button>
                                    <Button variant="danger" onClick={() => remove(_id)} className="ml-1">Remove</Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => history.push(`${UrlPrefixes[UserType.admin]}/review/${_id}/assign`)}
                                        className="ml-1">Assign</Button>
                                </div>
                            </td>
                        </tr>)
                }
            </tbody>
        </Table>
    </>
}

export default ReviewList

