export interface Module {
  server?: ServerSide;
  client?: ClientSide;
  configs?: ConfigHandler;
}

export interface ServerSide {

}

export interface ClientSide {

}

export interface ConfigHandler {
  register: () => void;
}