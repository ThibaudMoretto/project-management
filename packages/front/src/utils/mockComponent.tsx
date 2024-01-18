export const mockComponent = (mockName: string) => ({
  [mockName]: ({ children, ...otherProps }: any) => {
    const ComponentMock = `${mockName}-mock`;
    return <ComponentMock {...otherProps}>{children}</ComponentMock>;
  },
});
