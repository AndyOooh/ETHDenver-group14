export {};

declare global {
  // type contractData = {
  //   address: string;
  //   abi: any[];
  // };
  interface contractData {
    address: string;
    abi: any[];
  }
  // add more types and interfaces...
}
