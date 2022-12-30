import axios from "axios";

export const splitNetwork = async (cidr) => {
    const result = await axios.post(
      process.env.REACT_APP_SUBNET_SPLITTER_API_URL,
      {subnetCidr: cidr},
      {headers: {'Content-Type': 'application/json'}}
    )

    return result["data"]["subnets"]
  }