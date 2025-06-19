import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <h2 className='text-center'>Ops.. Error 404 <br /> PAGE NOT FOUND</h2>
            <p>Pagina non trovata</p>
            <Link to="/" className="btn"><p className='text-center btn'> Torna alla Homepage</p></Link>
        </div>
    )
}

export default NotFoundPage;
