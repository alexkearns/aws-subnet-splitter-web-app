import json
from ipaddress import ip_network


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    body = json.loads(event["body"])
    subnet_cidr = body["subnetCidr"]

    netmask = int(subnet_cidr.split("/")[1])

    if netmask < 16 or netmask > 27:
        raise Exception("The allowed block size to split is between a /27 netmask and /16 netmask.")

    network = ip_network(subnet_cidr)
    subnets = network.subnets()

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        "body": json.dumps({
            "subnets": [{
                "cidr": str(subnet),
                "usableHosts": len([h for h in subnet.hosts()])-3  # By default, n-2 are usable, AWS reserve an additional 3
            } for subnet in subnets],
        }),
    }
