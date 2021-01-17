import {Spinner, Button} from 'react-bootstrap'

const Loading = () => <div className="h-100 w-100 position-fixed d-flex align-items-center justify-content-center">
    <Button variant="success" disabled>
        <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
        />
        <span className="pl-2">Loading...</span>
    </Button>
</div>

export default Loading
