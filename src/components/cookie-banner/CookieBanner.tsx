import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { v4 as uuid } from 'uuid';

function CookieModal({ show, onDismiss, onAccept }: { show: boolean, onDismiss: (state: boolean) => void, onAccept: () => void }) {
  return (
    <Modal
      show={show}
      onClose={() => onDismiss(false)}
    >
      <Modal.Header>
        Privacy Overview
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            This website uses cookies to improve your experience while you navigate through the website. Out of these, the cookies that are categorized as necessary are stored on your browser as they are essential for the working of basic functionalities of the website. We also use third-party cookies that help us analyze and understand how you use this website. These cookies will be stored in your browser only with your consent. You also have the option to opt-out of these cookies. But opting out of some of these cookies may affect your browsing experience.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full">
        <Button color="success" onClick={() => onAccept()}>
          I accept
        </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [acceptedCookie, setCookie] = useState(document.cookie != null && document.cookie !== '');

  function acceptCookies(): void {
    document.cookie = `userId=${uuid()}`;
    setCookie(true);
  }

  return (
    <> 
    
    {!acceptedCookie  ? <>
      <div className="flex justify-center items-center w-screen fixed bottom-0 left-0 z-50 bg-white">
        <div className="w-9/12 p-3">
          We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking “Accept All”, you consent to the use of ALL the cookies. However, you may visit "Cookie Settings" to provide a controlled consent
        </div>
        <div className="w-3/12 flex justify-center">
          <Button className="mr-2" color="light" onClick={() => setVisible(true)}>Cookie Settings</Button>
          <Button color="success" onClick={() => acceptCookies()}>Accept All</Button>
        </div>
      </div>
      <CookieModal show={visible} onDismiss={setVisible} onAccept={acceptCookies} /></> : <></>}
    </>
  );
}

export default CookieBanner;