import { useState } from "react";
import AuthFormBtn from "../components/AuthFormBtn";
import type { loginFields, loginFormErrors } from "../types/auth";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
    
    const navigate = useNavigate();
    const fieldStyle = `border-[1px] border-gray-500 rounded-md placeholder:text-slate-600 py-2 px-4 w-full`;
    const formStyle = `w-[400px] flex flex-col gap-2`;
    const fieldErrStyle = 'text-xs text-red-500';
    const [formInputs, setFormInputs] = useState<loginFields>({usernameOrEmail: '', password:''});
    const [formErrs, setFormErrs] = useState<loginFormErrors>({generic: '', usernameOrEmail: '', password:''});

    function formSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setFormErrs({generic:'', usernameOrEmail:'', password:''});
        axios.post('http://localhost:5218/api/Auth/login', {...formInputs})
        .then((response) => {
            localStorage.setItem("jwt", response.data);
            navigate("/chat");
        })
        .catch ((error) => {
            handleFieldsErrors(error.response.data.code);
        })
    }

    const handleFieldsErrors = (code: string) => {
        switch(code){
            case 'USERNAME_EMAIL_REQUIRED':
                setFormErrs(prev => ({...prev, usernameOrEmail: 'الحقل إجباري'}));
            case 'PWD_REQUIRED':
                setFormErrs(prev => ({...prev, password: 'الحقل إجباري'}));
                break;
            case 'INVALID_CREDENTIALS':
                setFormErrs(prev => ({...prev, generic: 'معلومات المستخدم خاطئة'}));
                break;
            default:
                setFormErrs(prev => ({...prev, generic: 'عرضت مشكلة أثناء التسجيل الرجاء إعادة المحاولة'}));
                break;
        }
    }

    return (
        <>
        <div className='flex justify-center items-center h-full bg-sky-100'>
            <div className='py-10 px-5 bg-white rounded-xl flex flex-col justify-center items-center gap-12'>
            <h1 className='text-3xl'>تسجيل الدخول</h1>
                <form className={formStyle} onSubmit={formSubmit}>
                    {formErrs.generic && <div className='text-red-500'>{formErrs.generic}</div>}

                    <input name='usernameOrEamil' type='text' placeholder='اسم المستخدم أو البريد الإلكتروني' className={fieldStyle}
                    onChange={(e) => { setFormInputs({...formInputs, usernameOrEmail: e.target.value}); }}/>
                    {formErrs.usernameOrEmail && <div className={fieldErrStyle}>{formErrs.usernameOrEmail}</div>}

                    <input name='password' type='password' placeholder='كلمة المرور' className={fieldStyle}
                    onChange={(e) => { setFormInputs({...formInputs, password: e.target.value}); }}/>
                    {formErrs.password && <div className={fieldErrStyle}>{formErrs.password}</div>}

                    <AuthFormBtn>تسجيل</AuthFormBtn>
            </form>
            </div>
        </div>
        </>
    )
}
export default Login;
