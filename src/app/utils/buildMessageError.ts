interface IParamsBuildMessageError {
  controller: string;
  body: string;
  method: string;
}

export default ({ controller, body, method }: IParamsBuildMessageError) => {
  return `FUNCTION: ${controller} | BODY: ${body} | METHOD: ${method}`;
};
