export default function InputCustom({
    boxClass,
    inputClass,
    labelClass,
    register,
    value,
    onChange,
    validate,
    labelContent,
    status,
    title,
    required = true,
    type = 'text',
}) {
    return (
        <div className={`${boxClass ? boxClass : ''} relative`}>
            <input
                type={type}
                className={`${validate ? 'border-red-400' : 'border-[#C5C5C5]'} ${inputClass ? inputClass : ''} ${
                    value ? '' : 'focus-input-active'
                }`}
                id={register}
                value={value}
                name={register}
                onChange={onChange}
                autoComplete='false'
            />
            <label
                htmlFor={register}
                className={`${validate ? 'text-red-400' : 'text-[#646464]'} ${
                    value ? 'top-0 -translate-y-1/2' : 'top-1/2 -translate-y-1/2 '
                } ${
                    labelClass ? labelClass : ''
                } absolute left-[1vw] bg-white px-[0.5vw] cursor-pointer transition-all duration-300 text-[#646464] max-md:px-[1.27vw] max-md:left-[3vw] select-none`}
            >
                {labelContent}
                {required && <span className='text-red-400'> *</span>}
            </label>
            {status && title && (
                <p className='absolute bottom-0 left-0 translate-y-full pl-[1.5vw] text-den title14-600-150'>
                    {status && title}
                </p>
            )}
        </div>
    )
}
