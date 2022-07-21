export type AmplifyDependentResourcesAttributes = {
  auth: {
    rinkoub0680ea1: {
      IdentityPoolId: 'string'
      IdentityPoolName: 'string'
      UserPoolId: 'string'
      UserPoolArn: 'string'
      UserPoolName: 'string'
      AppClientIDWeb: 'string'
      AppClientID: 'string'
    }
  }
  function: {
    rinkou694283edDefineAuthChallenge: {
      Name: 'string'
      Arn: 'string'
      LambdaExecutionRole: 'string'
      Region: 'string'
    }
    rinkou694283edCreateAuthChallenge: {
      Name: 'string'
      Arn: 'string'
      LambdaExecutionRole: 'string'
      Region: 'string'
    }
    rinkoub0680ea1PostConfirmation: {
      Name: 'string'
      Arn: 'string'
      LambdaExecutionRole: 'string'
      Region: 'string'
    }
    rinkoujwtverify: {
      Name: 'string'
      Arn: 'string'
      Region: 'string'
      LambdaExecutionRole: 'string'
    }
  }
}
