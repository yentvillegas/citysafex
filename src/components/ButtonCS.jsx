function ButtonCS({text, bg, ...props}) {
    let className = `focus:outline-none text-white bg-${bg}-700 hover:bg-${bg}-800 focus:ring-4 focus:ring-${bg}-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-${bg}-600 dark:hover:bg-${bg}-700 dark:focus:ring-${bg}-900`
    
    return <button type="button" className={className} {...props}>
        {text}
    </button>
}
export default ButtonCS