import './App.css';
import { useState } from 'react';
import { splitNetwork } from './utils';
import Subnet from "./components/Subnet";
import Code from "./components/Code";

export const App = () => {
  const [vpcCidr, setVpcCidr] = useState("")
  const [subnets, setSubnets] = useState([])
  const [vpcUpdateDisabled, setVpcUpdateDisabled] = useState(false)

  const updateVpcCidrValue = (e) => {
    setVpcCidr(e.target.value)
  }

  const splitVpc = async () => {
    if (vpcUpdateDisabled === true) {
      return
    }
    const initialSubnets = await splitNetwork(vpcCidr)
    setVpcUpdateDisabled(true)
    setSubnets(initialSubnets)
  }

  const resetVpc = () => {
    setVpcUpdateDisabled(false)
    setVpcCidr("")
    setSubnets([])
  }

  const splitSubnet = async (cidrToSplit) => {
    const splitSubnets = await splitNetwork(cidrToSplit)

    let copyOfSubnets = structuredClone(subnets)
    const indexToRemove = copyOfSubnets.findIndex(el => el.cidr === cidrToSplit)
    copyOfSubnets.splice(indexToRemove, 1, ...splitSubnets)

    setSubnets(copyOfSubnets)
  }

  const subnetComponents = subnets.map(
    (subnet, index) => <Subnet id={index+1} key={index} data={subnet} splitSubnet={splitSubnet} />
  )

  return (
    <div className={"w-full min-h-screen bg-gray-800 p-8"}>
      <header className={"pb-8"}>
        <h1 className={"text-gray-200 font-medium text-6xl tracking-tight mb-2"}>AWS Subnet
          Splitter</h1>
        <h2 className={"text-gray-400 font-medium text-xl tracking-tight"}>
          Made with <span className={"text-red-600"}>&hearts;</span> by&nbsp;
          <a className={"underline"} href={"https://www.alexkearns.co.uk/?utm_campaign=Subnet+Splitter&utm_source=Subnet+Splitter+Web+App"}>
            Alex Kearns
          </a>
        </h2>
      </header>
      <div className={"border-t-2 border-t-gray-600 pt-8 grid grid-cols-2"}>
        <div className={"col-span-1 pr-8 border-r-2 border-r-gray-600"}>
          <label className={"mb-2 block text-gray-100 text-sm font-medium uppercase"} htmlFor="vpcCidr">VPC CIDR</label>
          <div className={"flex gap-x-2"}>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${vpcUpdateDisabled && "bg-gray-700 text-gray-500"}`}
              id="vpcCidr"
              name="vpcCidr"
              type="text"
              onChange={updateVpcCidrValue}
              value={vpcCidr}
              autoComplete={"off"}
              disabled={vpcUpdateDisabled}
            />
            <button className={`py-3 px-4 rounded bg-blue-300 text-sm font-medium uppercase ${vpcUpdateDisabled && "bg-gray-700 text-gray-500 hover:cursor-default"}`} onClick={splitVpc}>Split</button>
            {subnets.length > 0 && <button className={"py-3 px-4 rounded bg-red-500 text-sm font-medium uppercase"} onClick={resetVpc}>Reset</button> }
          </div>
          <div className={"flex flex-col gap-y-3 mt-8"}>
            { subnetComponents }
          </div>
        </div>
        <div className={"col-span-1 pl-8"}>
          {subnets.length > 0 && <Code vpcCidr={vpcCidr} subnets={subnets} />}
        </div>
      </div>
    </div>
  );
}

export default App;
