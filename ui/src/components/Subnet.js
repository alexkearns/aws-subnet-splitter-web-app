const Subnet = ({id, data, splitSubnet}) => {
  const split = () => splitSubnet(data.cidr)

  return <div className={"rounded p-4 bg-gray-700 text-gray-200 grid grid-cols-4"}>
    <div className={"text-sm col-span-3"}>
      <div className={"font-medium mb-1"}>{data.cidr}</div>
      <div className={"font-medium flex text-xs gap-x-1"}>
        <div className={"px-2 py-1 font-mono bg-gray-600 rounded"}>Subnet{id}</div>
        <div className={"px-2 py-1 bg-gray-600 rounded"}>{data.usableHosts} usable hosts</div>
      </div>
    </div>
    <div className={"col-span-1 flex items-center justify-end"}>
      <button onClick={split} className={"uppercase block text-sm bg-gray-600 text-gray-200 px-4 py-2 rounded font-medium"}>Split</button>
    </div>
  </div>
}

export default Subnet