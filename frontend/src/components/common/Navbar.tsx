import { UrlPrefixes, UserType } from "../../helpers/constants"

const Navbar = ({userType}: {userType: UserType}) => <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand">Performance Review</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
        <li className="nav-item active">
            <a className="nav-link" href={UrlPrefixes[userType] || '/'}>Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href={`${UrlPrefixes[userType]}/login`}>Login</a>
        </li>
        {userType === UserType.admin && <>
            <li className="nav-item">
                <a className="nav-link" href={`${UrlPrefixes[userType]}/register`}>Register</a>
            </li>
        </>}
    </ul>
    </div>
</nav>

export default Navbar