import { FaSearch } from 'react-icons/fa'

function Input() {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
            </div>
            <input
                type="text"
                name="search"
                id="search"
                className="block w-[335px] rounded-[44px] py-3 pl-10 text-base text-gray-900 ring-1 ring-nilg-gray focus:outline-none"
                placeholder="Search"
            />
        </div>
    )
}

export default Input
