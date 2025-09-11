import { Link } from 'react-router-dom'

import type { LogoBoxProps } from '@/types/component-props'

// import logoDark from '@/assets/images/logo-dark.png'
// import logoLight from '@/assets/images/logo-light.png'
import logoSm from '@/assets/images/logo-sm.png'

const LogoBox = ({ containerClassName, squareLogo, textLogo }: LogoBoxProps) => {
  return (
    <div className={containerClassName ?? ''}>
      <Link to="/" className="logo-dark">
        <img src={logoSm} className={squareLogo?.className} height={squareLogo?.height ?? 30} width={squareLogo?.width ?? 19} alt="logo sm" />
        <h4 className={textLogo?.className} height={textLogo?.height ?? 20} width={textLogo?.width ?? 60} alt="logo dark">SeekFactory</h4>
      </Link>
      <Link to="/" className="logo-light">
        <img src={logoSm} className={squareLogo?.className} height={squareLogo?.height ?? 30} width={squareLogo?.width ?? 19} alt="logo sm" />
        <h4 className={textLogo?.className} height={textLogo?.height ?? 20} width={textLogo?.width ?? 60} alt="SeekFactory">SeekFactory</h4>
      </Link>
    </div>
  )
}

export default LogoBox
