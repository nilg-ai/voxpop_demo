import { Button, Navbar } from "flowbite-react";
import './Header.scss';

function Header() {
  return (
    <Navbar
      className="Navbar"
      fluid={true}
      rounded={true}
    >
      <div className="flex flex-col items-start">
        <div className="font-black text-xl text-gray-900">SafeJourney</div>
        <div className="font-semibold text-xs text-gray-900 flex">by
          <img
            src="https://nilg.ai/wp-content/uploads/2022/03/logo.svg"
            alt="Nilg.ai"
            className="h-4 ml-3"
          />
        </div>
      </div>
      <div className="flex md:order-2 ml-auto">
        <a href="https://nilg.ai/safejourney/" type="button" target="_blank" rel="noreferrer">
          <Button
            color="white"
            className="focus:ring-gray-200"
          >
            About
          </Button>
        </a>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <form className="ml-2 mr-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-100 rounded-lg drop-shadow-lg focus:ring-gray-200 focus:border-gray-200" placeholder="Search" required />
            <button type="submit" className="absolute inset-y-0 right-0 transparent font-medium rounded-lg text-sm px-2 py-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
              </svg>

            </button>
          </div>
        </form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;