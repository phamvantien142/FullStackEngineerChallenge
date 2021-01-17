import { ReactNode } from 'react'
import { UserType } from '../../helpers/constants'
import Navbar from './Navbar'

const Container = ({userType, children}: {userType: UserType, children: ReactNode}) => <div className="vh-100">
    <Navbar userType={userType}/>
    <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="w-100">
            {children}
        </div>
    </div>
</div>

export default Container