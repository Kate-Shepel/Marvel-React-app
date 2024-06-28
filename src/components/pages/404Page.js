import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import errorpic from './errorpic.jpg';

const Page404 = () => {
  return (
    <div style={{display: 'flex', 'flexDirection': 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Helmet>
        <meta
          name="description"
          content="404 error"
          />
        <title>404 page error</title>
      </Helmet>
      <img src={errorpic} alt="Error 404" style={{width: '100%', height: 'auto'}}/>
      <Link style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px'}} to='/'>Back to main page</Link>
    </div>
  )
}

export default Page404;