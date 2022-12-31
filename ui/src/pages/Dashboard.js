import '../App.css';
import { useState } from 'react';
import { splitNetwork } from '../utils';
import Subnet from "../components/Subnet";
import Code from "../components/Code";
import App from "../App";

const Dashboard = () => {
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
    <App>
      <div className={"border-t-2 border-t-gray-600 pt-8 grid grid-cols-2"}>
        <div className={"col-span-1 pr-8 border-r-2 border-r-gray-600"}>
          <label className={"mb-2 block text-gray-100 text-sm font-medium uppercase"} htmlFor="vpcCidr">VPC CIDR</label>
          <div className={"flex gap-x-2"}>
            <input
              className={`appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${vpcUpdateDisabled ? "bg-gray-700 text-gray-500" : "bg-gray-200 text-gray-700"}`}
              id="vpcCidr"
              name="vpcCidr"
              type="text"
              placeholder={"10.0.0.0/16"}
              onChange={updateVpcCidrValue}
              value={vpcCidr}
              autoComplete={"off"}
              disabled={vpcUpdateDisabled}
            />
            <button className={`py-3 px-4 rounded text-sm font-medium uppercase ${vpcUpdateDisabled ? "bg-gray-700 text-gray-500 hover:cursor-default" : "bg-blue-300 text-black"}`} onClick={splitVpc}>Split</button>
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
    </App>
  );
}

export default Dashboard;