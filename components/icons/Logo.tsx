import Image from "next/image";

export const Logo = ({ isDark = true, ...props }) => {
  if (isDark)
    return (<Image
      className="h-10"
      src="/logo-white.svg"
      width={140}
      height={80}
      alt=""
    />)

  return (<Image
    className="h-10"
    src="/logo.svg"
    width={140}
    height={80}
    alt=""
  />)
}

export default Logo;