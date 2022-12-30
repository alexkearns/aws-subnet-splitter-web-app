import hljs from 'highlight.js/lib/core'
import yaml from 'highlight.js/lib/languages/yaml'
hljs.registerLanguage('yaml', yaml)

const Code = ({vpcCidr, subnets}) => {
  const subnetsCode = subnets.map((s, index) => {
    return `  Subnet${index+1}:
    Type: "AWS::EC2::Subnet"
    Properties:
      VpcId:
        Ref: "MyVpc"
      CidrBlock: "${s.cidr}"
      AvailabilityZone: "eu-west-1a"
    `
  })

  const flattenedSubnetCode = subnetsCode.join("\n")

  const code = `# Your generated CloudFormation template
# Update the AvailabilityZone property for the subnets to meet your requirements
  
AWSTemplateFormatVersion: "2010-09-09"
Description: "A sample template for your VPC and Subnets"

Resources:
  MyVpc:
    Type: "AWS::EC2::VPC"
    Properties:
      CidrBlock: "${vpcCidr}"
  
${flattenedSubnetCode}
`

  const highlightedCode = hljs.highlight(code, {language: "yaml"})

  return <div className={""}>
    <pre className={"bg-gray-900 p-5 rounded overflow-x-scroll"}>
      <code
        className={"language-yaml"}
        dangerouslySetInnerHTML={{__html: highlightedCode.value}}
      />
    </pre>
  </div>
}

export default Code