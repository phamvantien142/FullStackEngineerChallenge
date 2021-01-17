import { UserType } from '../../helpers/constants'
import Container from '../common/Container'

const Home = () => {
    return <Container userType={UserType.user}>
        Home Page
    </Container>
}

export default Home