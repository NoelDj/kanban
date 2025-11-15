
function Card ({children, className}) {

    return (
        <div className={"shadow-md bg-white rounded-md w-full " + className} id="here">
            {children}
        </div>
    )
}

export default Card