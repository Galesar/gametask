import Head from 'next/head';
import ButtonContainer from '../components/mainPageButtonContainer/container'; 
import LinkContainer from '../components/mainPageLinkConainer/Container';
import styles from './index.module.css';

export default function Home() {

  return(
    <div className='container'>
      <ButtonContainer />
      <h1 className={styles.texth1}>Game Task</h1>
        <div className={styles.text}>
        Simply<br/>
        Conviently<br/>
        Free<br/>
        Minimalistic UI
        </div>

      <LinkContainer />
    </div>
  )
}