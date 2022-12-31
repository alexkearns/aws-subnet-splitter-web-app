const App = (props) => {
  return (
    <div className={"w-full min-h-screen bg-gray-800 p-8"}>
      <header className={"pb-8"}>
        <h1 className={"text-gray-200 font-medium text-6xl tracking-tight mb-2"}>AWS Subnet
          Splitter</h1>
        <h2 className={"text-gray-400 font-medium text-xl tracking-tight"}>
          Made with <span className={"text-red-600"}>&hearts;</span> by&nbsp;
          <a className={"underline"} href={"https://www.alexkearns.co.uk/?utm_campaign=AWS+Subnet+Splitter&utm_source=AWS+Subnet+Splitter+Web+App"}>
            Alex Kearns
          </a>
        </h2>
      </header>
      {props.children}
    </div>
  )
}

export default App;
