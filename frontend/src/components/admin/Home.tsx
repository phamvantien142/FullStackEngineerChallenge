import { UserType } from '../../helpers/constants'
import Container from '../common/Container'
import ReviewList from './onboarding/ReviewList'
import UserList from './onboarding/UserList'

const Home = () => {
    return <Container userType={UserType.admin}>
        <div className="d-flex">
            <div className="col-md-6">
                <UserList />
            </div>
            <div className="col-md-6">
                <ReviewList />
            </div>
        </div>
    </Container>
}

export default Home