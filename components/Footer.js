function Footer() {
  return (
    <div className="bg-opacity-40 absolute bottom-0 px-32 flex items-center justify-between bg-blue-900 py-1 w-full">
      <div className="flex gap-2">
        <h1 className="text-center text-lg text-white">
          Copyright &copy; 2025 prepAIred: Naman Doshi |
        </h1>
        <h1 className="text-center text-lg text-white">All rights reserved</h1>
      </div>
      <div className="flex gap-10 text-white">
        <h1>
          {" "}
          <a href="https://github.com/namandoshi8/prepaired" target="_blank">
            {" "}
            Github
          </a>
        </h1>
        <h1>
          {" "}
          <a href="https://www.linkedin.com/in/namandoshi8/ " target="_blank">
            {" "}
            Linkedin{" "}
          </a>
        </h1>
        <h1>
          {" "}
          <a href="https://www.namandoshi.in" target="_blank">
            {" "}
            Portfolio{" "}
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Footer;
