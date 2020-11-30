import Link from './links/link';
import styles from './Container.module.css';

export default function LinkContainer() {
    return(
        <div className={styles.linkContainer}>
        <Link link='#' text='FAQ'/>
        <Link link='#' text='Contact Us'/>
        <Link link='#' text='Donation'/>
        </div>
    )
}