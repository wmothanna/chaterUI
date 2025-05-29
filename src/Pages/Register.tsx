import { useState } from "react";
import type { registrationForm, registrationFormErrors } from "../types/auth";
import AuthFormBtn from "../components/AuthFormBtn";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
    const fieldStyle = `border-[1px] border-gray-500 rounded-md placeholder:text-slate-600 py-2 px-4 w-full`;
    const formStyle = `w-[400px] flex flex-col gap-2`;
    const fieldErrStyle = 'text-xs text-red-500';
    const [formInputs, setFormInputs] = useState<registrationForm>({username: '', email: '', password:''});
    const [formErrs, setFormErrs] = useState<registrationFormErrors>({generic: '', username: '', email: '', password:''});


    const navigate = useNavigate();
    function formSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setFormErrs({generic:'', username:'', email:'', password:''});
        axios.post('http://localhost:5218/api/Auth/register', {...formInputs})
        .then(() => {
            navigate("/login");
        })
        .catch ((error) => {
            handleFieldsErrors(error.response.data.code);
        })
    }

    const handleFieldsErrors = (code: string) => {
        switch(code){
            case 'USERNAME_REQUIRED':
                setFormErrs(prev => ({...prev, username: 'الحقل إجباري'}));
                break;
            case 'USERNAME_FORMAT_ERR':
                setFormErrs(prev => ({...prev, username: 'تنسيق اسم المستخدم خاطئ غير مسموح بالرموز المميزة عدا - و _'}));
                break;
            case 'LONG_USERNAME':
                setFormErrs(prev => ({...prev, username: '64 المستخدم طويل'}));
                break;
            case 'USER_EXISTS':
                setFormErrs(prev => ({...prev, username: 'المستخدم مسجل'}));
                break;
            case 'EMAIL_REQUIRED':
                setFormErrs(prev => ({...prev, email: 'الحقل إجباري'}));
                break;
            case 'EMAIL_FORMAT_ERR':
                setFormErrs(prev => ({...prev, email: 'تنسيق عنوان البريد خاطئ'}));
                break;
            case 'LONG_EMAIL':
                setFormErrs(prev => ({...prev, email: 'عنوان البريد تجاوز 255'}));
                break;
            case 'PWD_REQUIRED':
                setFormErrs(prev => ({...prev, password: 'الحقل إجباري'}));
                break;
            case 'SHORT_PWD':
                setFormErrs(prev => ({...prev, password: 'كلمة المرور قصيرة، يجب أن تتكون على الأقل من 12 رمزا'}));
                break;
            case 'LONG_PWD':
                setFormErrs(prev => ({...prev, password: 'كلمة المرور تجاوزت ال 255 رمز'}));
                break;
            case 'WEAK_PWD':
                setFormErrs(prev => ({...prev, password: 'كلمة المرور ضعيفة'}));
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
                    <h2 className='text-3xl'>إنشاء حساب</h2>
                    <form className={formStyle} onSubmit={formSubmit}>
                        {formErrs.generic && <div className='text-red-500'>{formErrs.generic}</div>}

                        <input name='username' type='text' placeholder='اسم المستخدم' className={fieldStyle}
                        onChange={(e) => { setFormInputs({...formInputs, username: e.target.value}); }}/>
                        {formErrs.username && <div className={fieldErrStyle}>{formErrs.username}</div>}

                        <input name='email' type='email' placeholder='البريد الإلكتروني' className={fieldStyle}
                        onChange={(e) => { setFormInputs({...formInputs, email: e.target.value}); }}/>
                        {formErrs.email && <div className={fieldErrStyle}>{formErrs.email}</div>}

                        <input name='password' type='password' placeholder='كلمة المرور' className={fieldStyle}
                        onChange={(e) => { setFormInputs({...formInputs, password: e.target.value}); }}/>
                        {formErrs.password && <div className={fieldErrStyle}>{formErrs.password}</div>}

                        <AuthFormBtn>إنشاء</AuthFormBtn>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Register ;
