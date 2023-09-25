export default function BoxShowMap({ handleToggleShowMap = () => {}, show = true }) {
    return (
        <div
            onClick={handleToggleShowMap}
            className={`${
                show ? 'bg-[#e3c9b5]' : 'bg-[#838383]'
            } w-[2.875vw] h-[1.125vw] max-md:h-[8vw] max-md:w-[16vw] rounded-[6.25vw] relative transition-all duration-1000 ease-out cursor-pointer`}
        >
            <div
                className={`${
                    show ? 'border-[#e3c9b5] left-0' : 'right-0 border-[#838383]'
                } w-[1.5vw] h-[1.5vw] rounded-full border border-solid absolute top-1/2 bg-white -translate-y-1/2`}
            ></div>
        </div>
    )
}
