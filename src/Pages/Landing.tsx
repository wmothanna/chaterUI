import { Link } from 'react-router'
const Landing = () => {

  const buttonStyle = 'py-3 px-6 bg-white rounded-lg font-semibold text-xl duration-150 ease-in-out hover:scale-105';

  return (
    <div className='flex justify-center items-center h-full bg-sky-100 gap-3'>
      <Link to="register">
        <button className={buttonStyle}>إنشاء حساب</button>
      </Link>
      <Link to="login">
        <button className={buttonStyle}>تسجيل الدخول</button>
      </Link>
    </div>
  )
}

export default Landing;