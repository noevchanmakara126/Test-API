import { useState } from "react";

import { Button, Navbar } from "flowbite-react";

function App() {
  return (
    <Navbar className="bg-blue-950 drop-shadow-xl shadow-black">
      <Navbar.Brand className="ml-10" href="https://istad.co/">
        <img
          src="https://istad.co/resources/img/logo_md.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-2xl  font-bold text-blue-700  dark:text-white">
          CSTAD Confession
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-xl text-blue-500" href="/">
          Home
        </Navbar.Link>
        <Navbar.Link className="text-xl text-blue-500" href="/confess">
          Confession
        </Navbar.Link>
        <Navbar.Link className="text-xl text-blue-500" href="/yoursubmited">
          Your Submissions
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;
