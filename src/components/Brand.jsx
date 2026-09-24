import Link from 'next/link';
export default function Brand({ small = false }) {
  return <Link className={`brand ${small ? 'brand-small' : ''}`} href="/" aria-label="FitLog home">
    <img src="/images/logo.png" alt="" width="28" height="28" /><span>FITLOG</span>
  </Link>;
}
