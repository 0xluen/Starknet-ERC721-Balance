export type StarkModuleField = {
    id: string;
    question: string;
    textarea?: boolean;
    placeholder?: string;
  };
  
  export type StarkModule = {
    name: string;
    fields: StarkModuleField[];
    shouldHaveRole: (
      starknetWalletAddress: string,
      starknetNetwork: "mainnet" | "goerli",
      starkyModuleConfig: StarkModuleConfig
    ) => Promise<boolean>;
  };
  
  export type StarkModules = {
    [moduleId: string]: StarkModule;
  };
  
  export type StarkModuleConfig = {
    [key: string]: string;
  };